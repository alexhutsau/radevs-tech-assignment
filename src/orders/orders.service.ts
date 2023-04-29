import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { Order } from './entities/order.entity'
import { TagsService } from './tags/tags.service'

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private tagsService: TagsService,
  ) {}

  findOne(id: string, userId: string): Promise<Order | undefined> {
    return this.ordersRepository.findOne({ where: { id, userId } })
  }

  async findAll(userId: string, tags?: string[]): Promise<Order[]> {
    const orderIds = tags?.length && await this.tagsService.findUserOrderIdsByTagName(userId, tags)

    if (orderIds && !orderIds.length) {
      return []
    }

    return this.ordersRepository.find({
      where: { ...orderIds ? { id: In(orderIds) } : { userId } },
      relations: ['tags']
    })
  }
}
