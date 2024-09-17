import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UsersInMeet } from '../users-in-meets/entities/users-in-meet.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'sheduled_meets' })
export class SheduledMeet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Index()
  @Column('timestamptz', { unique: true })
  sheduledDate: Date;

  @ManyToOne(() => User, (user) => user.sheduled_meets)
  @JoinColumn({ name: 'creator_user_id' })
  creatorUser: User;

  @OneToMany(() => UsersInMeet, (userInMeet) => userInMeet.meet)
  usersInMeets: UsersInMeet[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
