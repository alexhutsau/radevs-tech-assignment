import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm'
import { Order } from '../../entities/order.entity'

@Entity({ name: 'order_tags' })
@Unique(['orderId', 'name'])
export class OrderTag {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'order_id', type: 'uuid' })
  orderId: string

  @Column()
  name: string

  @Column()
  color: string

  // Relations

  @ManyToOne(() => Order, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Order
}
