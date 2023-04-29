import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrderTag } from './tags/entities/tag.entity';
import { TagsModule } from './tags/tags.module';
import { TagsService } from './tags/tags.service';

@Module({
  providers: [OrdersService, TagsService],
  controllers: [OrdersController],
  imports: [
    TypeOrmModule.forFeature([Order, OrderTag]),
    TagsModule,
  ],
  exports: [OrdersService],
})
export class OrdersModule {}
