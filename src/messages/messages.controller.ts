import { UsersService } from './../users/users.service';
import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { User } from 'src/users/entities/user.entity';

@Controller('messages')
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly usersService: UsersService,
  ) { }

  @Post()
  async create(@Body() createMessageDto: CreateMessageDto) {
    const user: User = await this.usersService.findByEmail(
      createMessageDto.email,
    );
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.messagesService.create(user, createMessageDto);
  }

  @Get()
  findAll() {
    return this.messagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(+id);
  }
}
