import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UsersInMeet } from '../../sheduled-meets/users-in-meets/entities/users-in-meet.entity';
import { SheduledMeet } from '../../sheduled-meets/entities/sheduled-meet.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @OneToMany(() => UsersInMeet, (userInMeet) => userInMeet.user)
  @JoinColumn({ name: 'users_in_meets' })
  users_in_meets: UsersInMeet[];

  @OneToMany(() => SheduledMeet, (meet) => meet.creatorUser)
  sheduled_meets: SheduledMeet[];

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
