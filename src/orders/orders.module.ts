import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { TagsController } from './tags/tags.controller';
import { TagsModule } from './tags/tags.module';

@Module({
  providers: [OrdersService],
  controllers: [TagsController],
  imports: [TagsModule]
})
export class OrdersModule {}
