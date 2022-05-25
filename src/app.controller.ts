import { UsersService } from './users/users.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';

import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.userService.findByEmail(req.user.email);
  }
}
