import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'
import { IOrderTag, OrderTag } from './entities/tag.entity'

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(OrderTag)
    private tagsRepository: Repository<OrderTag>,
  ) {}

  async save(tagInfo: IOrderTag): Promise<OrderTag> {
    return (await this.tagsRepository.createQueryBuilder()
      .insert().orUpdate(['color'], ['order_id', 'name'])
      .values(tagInfo)
      .returning('*')
      .execute()
    ).generatedMaps[0] as OrderTag
  }

  delete(id: string, userId: string): Promise<DeleteResult> {
    return this.tagsRepository.query(`
      delete from order_tags
       using orders
       where order_tags.order_id = orders.id
         and orders.user_id = $1
         and order_tags.id = $2
    `, [userId, id])
  }
}
