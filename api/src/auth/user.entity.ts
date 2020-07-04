import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';
import { hash } from 'bcrypt';
import { Habit } from '../habits/habit.entity';
import { Exclude, classToPlain } from 'class-transformer';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  salt: string;

  @Column({ nullable: true })
  email: string;

  @OneToMany((type) => Habit, (habit) => habit.user)
  habits: Habit[];

  toJSON(): any {
    return classToPlain(this);
  }

  async validatePassword(password: string): Promise<boolean> {
    const userHash = await hash(password, this.salt);
    return userHash === this.password;
  }
}
