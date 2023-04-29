import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { User } from '../../users/entities/user.entity'
import { OrderTag } from '../tags/entities/tag.entity'

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string

  // Relations

  @ManyToOne(() => User, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'user_id' })
  user?: User

  @OneToMany(() => OrderTag, tag => tag.order)
  tags?: OrderTag[]
}
