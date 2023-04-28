import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { OrdersService } from '../orders.service';
import { OrderTag } from './entities/tag.entity';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

@Module({
  controllers: [TagsController],
  providers: [TagsService, OrdersService],
  imports: [
    TypeOrmModule.forFeature([OrderTag, Order]),
  ],
})
export class TagsModule {}
