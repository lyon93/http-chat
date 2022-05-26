import { Notification } from './../notifications/entities/notification.entity';
import { NotificationsService } from './../notifications/notifications.service';
import { Message } from './entities/message.entity';
import { User } from './../users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    private notificationService: NotificationsService
  ) { }

  async create(senderEmail: string, user: User, createMessageDto: CreateMessageDto) {
    let message: Message = new Message();
    message.body = createMessageDto.body;
    message.user = user;

    message = await this.messageRepository.save(message);
    let notification: Notification = new Notification();
    notification.user = user;
    notification.senderEmail = senderEmail;
    await this.notificationService.create(notification);
    return message;
  }

  findAll(user: User) {
    return this.messageRepository.find({ where: { user } });
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }
}
