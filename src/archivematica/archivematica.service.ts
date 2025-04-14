import { Injectable, Inject, forwardRef } from '@nestjs/common'
import { DocumentsService } from '../documents/documents.service'

@Injectable()
export class ArchivematicaService {
  constructor(
    @Inject(forwardRef(() => DocumentsService))
    private readonly documentsService: DocumentsService,
  ) {}

  async processarSimulado(documentId: string) {
    console.log('[Archivematica] Processando documento:', documentId)
    console.log('🔐 API KEY:', process.env.ARCHIVEMATICA_API_KEY)

    await new Promise((resolve) => setTimeout(resolve, 5000))

    const sucesso = Math.random() < 0.9
    const status = sucesso ? 'PRESERVADO' : 'FALHA'

    console.log(`[Archivematica] Resultado simulado: ${status}`)

    await this.documentsService.updateStatus(documentId, status)
    return status
  }
}
