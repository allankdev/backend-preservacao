import { Module, forwardRef } from '@nestjs/common'
import { DocumentsService } from './documents.service'
import { DocumentsController } from './documents.controller'
import { PrismaService } from '../../prisma/prisma.service'
import { JwtModule } from '@nestjs/jwt'
import { ArchivematicaModule } from '../archivematica/archivematica.module'

@Module({
  imports: [
    forwardRef(() => ArchivematicaModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'segredo123',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [DocumentsController],
  providers: [DocumentsService, PrismaService],
  exports: [DocumentsService], // ✅ ESSENCIAL!
})
export class DocumentsModule {}
