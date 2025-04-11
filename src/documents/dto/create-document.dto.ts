import { IsNotEmpty, IsString, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'

export class CreateDocumentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty({
    example: {
      autor: 'João Silva',
      tema: 'História',
      linguagem: 'Português',
      ano: '2024',
    },
  })
  @IsOptional()
  @Transform(({ value }) => {
    try {
      return typeof value === 'string' ? JSON.parse(value) : value
    } catch {
      return null
    }
  })
  metadata: Record<string, any>
}
