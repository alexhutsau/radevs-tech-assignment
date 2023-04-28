import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm'
import { User } from '../../entities/user.entity'

@Entity({ name: 'user_tags' })
@Unique(['userId', 'name'])
export class UserTag {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string

  @Column()
  name: string

  @Column()
  color: string

  // Relations

  @ManyToOne(() => User, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User
}
