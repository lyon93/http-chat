import { NotificationsModule } from './../notifications/notifications.module';
import { Message } from './entities/message.entity';
import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    UsersModule,
    NotificationsModule,
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
