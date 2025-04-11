import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Req,
  Delete,
  UploadedFile,
  UseInterceptors,
  Res,
  Query,
  UnauthorizedException,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname, join } from 'path'
import * as fs from 'fs'
import { Response, Request } from 'express'
import { v4 as uuid } from 'uuid'
import { DocumentsService } from './documents.service'
import { CreateDocumentDto } from './dto/create-document.dto'
import { JwtService } from '@nestjs/jwt'
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger'
import { UpdateStatusDto } from './dto/update-status.dto'

@ApiTags('Documentos')
@ApiBearerAuth()
@Controller('documents')
export class DocumentsController {
  constructor(
    private readonly documentsService: DocumentsService,
    private readonly jwtService: JwtService,
  ) {}

  private extractUserIdFromRequest(req: Request): string | null {
    const token =
      req.cookies?.token || req.headers['authorization']?.replace('Bearer ', '')
    if (!token) return null
    try {
      const payload = this.jwtService.verify(token)
      return payload?.sub
    } catch {
      return null
    }
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueName = `${uuid()}${extname(file.originalname)}`
          cb(null, uniqueName)
        },
      }),
    }),
  )
  @ApiOperation({ summary: 'Criar novo documento com upload de PDF' })
  create(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
    @Body() dto: CreateDocumentDto,
  ) {
    const userId = this.extractUserIdFromRequest(req)
    if (!userId) throw new UnauthorizedException('Usuário não autenticado')
    return this.documentsService.create(userId, dto, file.filename)
  }

  @Get()
  @ApiOperation({ summary: 'Listar documentos do usuário autenticado' })
  findAll(@Req() req: Request) {
    const userId = this.extractUserIdFromRequest(req)
    if (!userId) throw new UnauthorizedException('Usuário não autenticado')
    return this.documentsService.findAllByUser(userId)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter detalhes de um documento específico' })
  @ApiParam({ name: 'id', type: 'string' })
  findOne(@Param('id') id: string) {
    return this.documentsService.findOne(id)
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Atualizar status de um documento' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: UpdateStatusDto })
  updateStatus(@Param('id') id: string, @Body() dto: UpdateStatusDto) {
    return this.documentsService.updateStatus(id, dto.status)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um documento' })
  @ApiParam({ name: 'id', type: 'string' })
  delete(@Param('id') id: string) {
    return this.documentsService.remove(id)
  }

  @Get(':id/view')
  @ApiOperation({ summary: 'Servir PDF com token temporário de acesso' })
  @ApiParam({ name: 'id', type: 'string' })
  async secureView(
    @Param('id') id: string,
    @Query('token') token: string,
    @Res() res: Response,
  ) {
    try {
      this.jwtService.verify(token)
      const payload = this.jwtService.decode(token) as any

      if (!payload?.sub || payload.documentId !== id) {
        return res.status(403).json({ message: 'Token inválido para este documento' })
      }

      const document = await this.documentsService.findOne(id)
      const filePath = join(process.cwd(), 'uploads', document.pdfPath)

      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: 'Arquivo não encontrado' })
      }

      res.setHeader('Content-Type', 'application/pdf')
      fs.createReadStream(filePath).pipe(res)
    } catch (err) {
      return res.status(401).json({ message: 'Token inválido ou expirado' })
    }
  }

  @Get(':id/token')
  @ApiOperation({ summary: 'Gerar token de acesso temporário para PDF' })
  @ApiParam({ name: 'id', type: 'string' })
  async generateAccessToken(@Param('id') id: string, @Req() req: Request) {
    const userId = this.extractUserIdFromRequest(req)
    const document = await this.documentsService.findOne(id)

    if (!document || document.userId !== userId) {
      throw new UnauthorizedException('Documento não encontrado ou acesso negado')
    }

    const token = this.jwtService.sign(
      { sub: userId, documentId: id },
      { expiresIn: '15m' },
    )

    return { token }
  }
}
