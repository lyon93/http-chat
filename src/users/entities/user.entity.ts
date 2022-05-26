import { Notification } from './../../notifications/entities/notification.entity';
import { Message } from './../../messages/entities/message.entity';
import { Exclude } from 'class-transformer';
import { MinLength } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ default: true })
  active: boolean;

  @Column()
  @MinLength(8)
  @Exclude()
  password: string;

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];
}
