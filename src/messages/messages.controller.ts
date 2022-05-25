import { UsersService } from './../users/users.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { User } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('messages')
@UseGuards(JwtAuthGuard)
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
  async findAll(@Request() req) {
    const user: User = await this.usersService.findByEmail(req.user.email);
    return this.messagesService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(+id);
  }
}
