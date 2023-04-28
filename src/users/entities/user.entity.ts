import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { UserTag } from '../tags/entites/tag.entity'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  name: string

  // Relations

  @OneToMany(() => UserTag, tag => tag.user)
  tags?: UserTag[]
}