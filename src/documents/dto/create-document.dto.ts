import { IsNotEmpty, IsString, IsObject } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateDocumentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty({
    example: {
      autor: 'João Silva',
      tipo: 'PDF',
      tema: 'Patrimônio cultural',
      linguagem: 'Português',
    },
  })
  @IsObject()
  metadata: Record<string, any>
}
