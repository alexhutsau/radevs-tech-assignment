import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm'
import { Order } from '../../entities/order.entity'

export interface IOrderTag {
  orderId: string
  name: string
  color: string
}

@Entity({ name: 'order_tags' })
@Unique(['orderId', 'name'])
export class OrderTag implements IOrderTag {
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
  order?: Order
}
