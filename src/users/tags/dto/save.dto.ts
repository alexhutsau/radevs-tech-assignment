import { IsHexColor, IsNotEmpty } from 'class-validator'

export class SaveUserTagBodyDto {
  @IsNotEmpty()
  name: string

  @IsHexColor()
  color: string
}
