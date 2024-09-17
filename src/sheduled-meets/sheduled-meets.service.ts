import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSheduledMeetDto } from './dto/create-sheduled-meet.dto';
import { UpdateSheduledMeetDto } from './dto/update-sheduled-meet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SheduledMeet } from './entities/sheduled-meet.entity';
import { Connection, In, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { ErrorCode } from '../utils/error';
import { UsersInMeet } from './users-in-meets/entities/users-in-meet.entity';

@Injectable()
export class SheduledMeetsService {
  constructor(
    @InjectRepository(SheduledMeet)
    private readonly sheduledMeetRepository: Repository<SheduledMeet>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly connection: Connection,
  ) {}

  async create(
    createSheduledMeetDto: CreateSheduledMeetDto,
  ): Promise<SheduledMeet> {
    const { name, sheduledDate, userIds, creator_user } = createSheduledMeetDto;

    return await this.connection.transaction(async (manager) => {
      const creatorUser = await manager.findOne(User, {
        where: { id: creator_user },
      });
      if (!creatorUser) {
        throw new NotFoundException({
          message: `User with id ${creator_user} not found`,
          code: ErrorCode.USER_NOT_FOUND,
        });
      }

      const existingMeet = await manager.findOne(SheduledMeet, {
        where: { sheduledDate: new Date(sheduledDate) },
      });
      if (existingMeet) {
        throw new ConflictException({
          message: `SheduledMeet at ${sheduledDate} already exists`,
          code: ErrorCode.MEET_ALREADY_EXISTS,
        });
      }

      const sheduledMeet = manager.create(SheduledMeet, {
        name,
        sheduledDate,
        creatorUser: creatorUser,
      });

      const sheduledMeetSaved = await manager.save(sheduledMeet);

      const users = await manager.find(User, { where: { id: In(userIds) } });

      const foundUserIds = users.map((user) => user.id);
      const missingUserIds = userIds.filter((id) => !foundUserIds.includes(id));

      if (missingUserIds.length > 0) {
        throw new NotFoundException({
          message: `Users with ids ${missingUserIds.join(', ')} not found`,
          code: ErrorCode.USER_NOT_FOUND,
        });
      }

      const usersInMeetPromises = users.map(async (user) => {
        const usersInMeet = manager.create(UsersInMeet, {
          user: user,
          meet: sheduledMeetSaved,
        });

        return manager.save(usersInMeet);
      });

      await Promise.all(usersInMeetPromises);

      return await manager.findOne(SheduledMeet, {
        where: { id: sheduledMeetSaved.id },
        relations: ['usersInMeets', 'usersInMeets.user', 'creatorUser'],
      });
    });
  }

  findAll(): Promise<SheduledMeet[]> {
    return this.sheduledMeetRepository.find({
      relations: ['usersInMeets', 'usersInMeets.user', 'creatorUser'],
    });
  }

  async findOne(id: number): Promise<SheduledMeet> {
    const sheduledMeet = await this.sheduledMeetRepository.findOne({
      where: { id },
      relations: ['usersInMeets', 'usersInMeets.user', 'creatorUser'],
    });

    if (!sheduledMeet) {
      throw new NotFoundException({
        message: `Sheduled meet with id ${id} not found`,
        code: ErrorCode.SCHEDULED_MEET_NOT_FOUND,
      });
    }

    return sheduledMeet;
  }

  async update(
    id: number,
    updateSheduledMeetDto: UpdateSheduledMeetDto,
  ): Promise<SheduledMeet> {
    const { name, sheduledDate, userIds } = updateSheduledMeetDto;

    return await this.connection.transaction(async (manager) => {
      const sheduledMeet = await manager.findOne(SheduledMeet, {
        where: { id },
        relations: ['usersInMeets', 'usersInMeets.user', 'creatorUser'],
      });

      if (!sheduledMeet) {
        throw new NotFoundException({
          message: `Sheduled meet with id ${id} not found`,
          code: ErrorCode.SCHEDULED_MEET_NOT_FOUND,
        });
      }

      if (name !== undefined) {
        sheduledMeet.name = name;
      }
      if (sheduledDate !== undefined) {
        sheduledMeet.sheduledDate = new Date(sheduledDate);
      }

      console.log(sheduledMeet.sheduledDate);

      await manager.save(sheduledMeet);

      if (userIds !== undefined) {
        const currentUserIds = sheduledMeet.usersInMeets.map(
          (userInMeet) => userInMeet.user.id,
        );

        const userIdsToAdd = userIds.filter(
          (userId) => !currentUserIds.includes(userId),
        );
        const userIdsToRemove = currentUserIds.filter(
          (userId) => !userIds.includes(userId),
        );

        if (userIdsToRemove.length > 0) {
          await manager.delete(UsersInMeet, {
            user: In(userIdsToRemove),
            meet: sheduledMeet,
          });
        }

        if (userIdsToAdd.length > 0) {
          const usersToAdd = await manager.find(User, {
            where: { id: In(userIdsToAdd) },
          });

          const foundUserIdsToAdd = usersToAdd.map((user) => user.id);
          const missingUserIdsToAdd = userIdsToAdd.filter(
            (id) => !foundUserIdsToAdd.includes(id),
          );

          if (missingUserIdsToAdd.length > 0) {
            throw new NotFoundException({
              message: `Users with ids ${missingUserIdsToAdd.join(', ')} not found`,
              code: ErrorCode.USER_NOT_FOUND,
            });
          }

          const usersInMeetPromises = usersToAdd.map(async (user) => {
            const usersInMeet = manager.create(UsersInMeet, {
              user,
              meet: sheduledMeet,
            });

            return manager.save(usersInMeet);
          });

          await Promise.all(usersInMeetPromises);
        }
      }

      return await manager.findOne(SheduledMeet, {
        where: { id: sheduledMeet.id },
        relations: ['usersInMeets', 'usersInMeets.user', 'creatorUser'],
      });
    });
  }

  async remove(id: number): Promise<void> {
    const sheduledMeet = await this.sheduledMeetRepository.findOne({
      where: { id },
    });

    await this.sheduledMeetRepository.remove(sheduledMeet);
  }
}
