import { Exclude } from 'class-transformer';
import { MinLength } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
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
}
