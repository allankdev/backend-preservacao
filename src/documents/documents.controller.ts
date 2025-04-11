import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Req,
  Delete,
} from '@nestjs/common'
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

  // Utilitário simples para extrair o ID do usuário autenticado
  private extractUserIdFromRequest(req: any): string {
    const authHeader = req.headers.authorization
    if (!authHeader) return null
    const token = authHeader.replace('Bearer ', '')
    const payload = this.jwtService.decode(token) as any
    return payload?.sub
  }

  @Post()
  @ApiOperation({ summary: 'Criar novo documento para preservação' })
  @ApiBody({ type: CreateDocumentDto })
  create(@Req() req: any, @Body() dto: CreateDocumentDto) {
    const userId = this.extractUserIdFromRequest(req)
    return this.documentsService.create(userId, dto)
  }

  @Get()
  @ApiOperation({ summary: 'Listar documentos do usuário autenticado' })
  findAll(@Req() req: any) {
    const userId = this.extractUserIdFromRequest(req)
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
}
