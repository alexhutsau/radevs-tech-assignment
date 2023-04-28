import { Body, Controller, Delete, ForbiddenException, Param, ParseUUIDPipe, Put } from '@nestjs/common'
import { IQuery } from '../../middleware/auth.guard'
import { OrdersService } from '../orders.service'
import { SaveOrderTagBodyDto } from './dto/save.dto'
import { TagsService } from './tags.service'

@Controller('order/tags')
export class TagsController {
  constructor(
    private readonly tagsService: TagsService,
    private readonly ordersService: OrdersService,
  ) {}

  @Put()
  async save(@Param('query') query: IQuery, @Body() body: SaveOrderTagBodyDto) {
    const order = await this.ordersService.findOne(body.orderId, query.user.id)

    if (!order) {
      throw new ForbiddenException()
    }

    return this.tagsService.save({ ...body })
  }

  @Delete(':id')
  async delete(@Param('query') query: IQuery, @Param('id', ParseUUIDPipe) tagId: string) {
    await this.tagsService.delete(tagId, query.user.id)
  }
}
