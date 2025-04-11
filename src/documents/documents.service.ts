import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateDocumentDto } from './dto/create-document.dto'

@Injectable()
export class DocumentsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateDocumentDto) {
    return this.prisma.document.create({
      data: {
        name: dto.name,
        status: 'INICIADO',
        metadata: dto.metadata,
        userId,
      },
    })
  }

  async findAllByUser(userId: string) {
    return this.prisma.document.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })
  }

  async findOne(id: string) {
    const doc = await this.prisma.document.findUnique({ where: { id } })
    if (!doc) throw new NotFoundException('Documento não encontrado')
    return doc
  }

  async updateStatus(id: string, status: string) {
    return this.prisma.document.update({
      where: { id },
      data: { status },
    })
  }

  async remove(id: string) {
    return this.prisma.document.delete({
      where: { id },
    })
  }
}
