import { UsersService } from './../users/users.service';
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { User } from '../users/entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  async findAll(@Request() req) {
    const user: User = await this.usersService.findByEmail(req.user.email);
    return this.notificationsService.findAll(user);
  }
}
