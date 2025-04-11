import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import * as express from 'express'
import * as cookieParser from 'cookie-parser'
import { join } from 'path'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // ✅ Middleware para ler cookies (necessário para HttpOnly token)
  app.use(cookieParser())

  // ✅ Habilita validação global com whitelist
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  // ✅ Habilita CORS para permitir envio de cookies do frontend
  app.enableCors({
    origin: 'http://localhost:3001', // Altere conforme o domínio do seu frontend
    credentials: true,
  })

  // ✅ Servir arquivos estáticos da pasta /uploads
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')))

  // ✅ Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Preservação Digital API')
    .setDescription('Documentação da API do sistema de preservação com Archivematica')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  // ✅ Inicia o servidor na porta 3000
  await app.listen(3000)
}
bootstrap()
