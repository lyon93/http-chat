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
  BadRequestException,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { User } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';


@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly usersService: UsersService,
  ) { }

  @Post()
  async create(@Request() req, @Body() createMessageDto: CreateMessageDto) {
    const user: User = await this.usersService.findByEmail(
      createMessageDto.email,
    );
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.active) {
      throw new BadRequestException('Inactive user');
    }
    return this.messagesService.create(req.user.email, user, createMessageDto);
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
