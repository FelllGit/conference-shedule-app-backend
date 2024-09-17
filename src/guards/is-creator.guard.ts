import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { SheduledMeetsService } from '../sheduled-meets/sheduled-meets.service';
import { ErrorCode } from '../utils/error';

@Injectable()
export class IsCreatorGuard implements CanActivate {
  constructor(private readonly sheduledMeetsService: SheduledMeetsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const user = request.user; // Authenticated user from JwtAuthGuard
    const meetId = parseInt(request.params.id, 10); // Meet ID from route parameter

    if (isNaN(meetId)) {
      throw new ForbiddenException(
        'Invalid meet ID',
        ErrorCode.SCHEDULED_MEET_NOT_FOUND,
      );
    }

    const scheduledMeet = await this.sheduledMeetsService.findOne(meetId);
    if (!scheduledMeet) {
      throw new NotFoundException(
        `Scheduled meet with ID ${meetId} not found.`,
      );
    }

    if (scheduledMeet.creatorUser.id !== user.id) {
      throw new ForbiddenException({
        message:
          'You are not the creator of this meet and cannot perform this action.',
        code: ErrorCode.NOT_ENOUGH_PERMISSIONS,
      });
    }

    return true;
  }
}
