import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TagsModule } from './tags/tags.module';

@Module({
  providers: [OrdersService],
  controllers: [OrdersController],
  imports: [
    TagsModule,
    TypeOrmModule.forFeature([Order]),
  ],
})
export class OrdersModule {}
