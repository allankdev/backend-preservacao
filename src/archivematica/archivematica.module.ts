import { Module, forwardRef } from '@nestjs/common'
import { ArchivematicaService } from './archivematica.service'
import { DocumentsModule } from '../documents/documents.module'
import { PrismaService } from '../../prisma/prisma.service'

@Module({
  imports: [forwardRef(() => DocumentsModule)],
  providers: [ArchivematicaService, PrismaService], // ✅ Adiciona PrismaService
  exports: [ArchivematicaService],
})
export class ArchivematicaModule {}
