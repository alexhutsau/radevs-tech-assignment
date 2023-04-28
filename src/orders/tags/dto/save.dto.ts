import { IsHexColor, IsNotEmpty, IsUUID } from 'class-validator'
import { IOrderTag } from '../entities/tag.entity'

export class SaveOrderTagBodyDto implements IOrderTag {
  @IsUUID()
  orderId: string

  @IsNotEmpty()
  name: string

  @IsHexColor()
  color: string
}
