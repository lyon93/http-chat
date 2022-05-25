import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersModule],
  providers: [AuthService],
})
export class AuthModule {}
