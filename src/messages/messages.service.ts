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
  ) { }

  create(user: User, createMessageDto: CreateMessageDto) {
    let message: Message = new Message();
    message.body = createMessageDto.body;
    message.user = user;
    return this.messageRepository.save(message);
  }

  findAll(user: User) {
    return this.messageRepository.find({ where: { user } });
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }
}
