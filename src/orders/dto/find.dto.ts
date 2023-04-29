import { Transform } from 'class-transformer'
import { IsOptional } from 'class-validator'

export class FindQueryDto {
  @IsOptional()
  @Transform(({ value }) => (value as string)?.split(',').map(s => s.trim()).filter(Boolean))
  tags: string[]
}
