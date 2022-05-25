import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  body: string;
}
