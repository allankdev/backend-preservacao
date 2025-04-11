import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { DocumentsModule } from './documents/documents.module'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    AuthModule,
    DocumentsModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'segredo123',
      signOptions: { expiresIn: '7d' },
    }),
  ],
})
export class AppModule {}
