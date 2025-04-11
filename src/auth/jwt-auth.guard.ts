import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()

    const token =
      request.cookies?.token || // tenta pegar do cookie
      request.headers['authorization']?.replace('Bearer ', '') // fallback

    if (!token) throw new UnauthorizedException('Token não fornecido.')

    try {
      const decoded = this.jwtService.verify(token)
      ;(request as any).user = decoded // 👈 força a tipagem sem erro
      return true
    } catch (err) {
      throw new UnauthorizedException('Token inválido ou expirado.')
    }
  }
}
