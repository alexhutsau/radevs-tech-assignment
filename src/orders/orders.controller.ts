import { Controller, Get, Param, Query } from '@nestjs/common'
import { IQuery } from '../middleware/auth.guard'
import { FindQueryDto } from './dto/find.dto'
import { OrdersService } from './orders.service'

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
  ) {}

  @Get()
  find(@Param('query') query: IQuery, @Query() { tags }: FindQueryDto) {
    return this.ordersService.findAll(query.user.id, tags)
  }
}
