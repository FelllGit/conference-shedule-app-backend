import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../../users/entities/user.entity';
import { SheduledMeet } from '../../entities/sheduled-meet.entity';

@Entity({ name: 'users_in_meets' })
export class UsersInMeet {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.users_in_meets)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => SheduledMeet, (meet) => meet.usersInMeets, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'meet_id' })
  meet: SheduledMeet;

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
