import { IsIn } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateStatusDto {
  @ApiProperty({ enum: ['INICIADO', 'PRESERVADO', 'FALHA'] })
  @IsIn(['INICIADO', 'PRESERVADO', 'FALHA'])
  status: string
}
