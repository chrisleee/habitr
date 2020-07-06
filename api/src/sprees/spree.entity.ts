import { classToPlain, Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Habit } from '../habits/habit.entity';

@Entity()
export class Spree extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  start: Date;

  @Column()
  end: Date;

  @ManyToOne((type) => Habit, (habit) => habit.sprees)
  @Exclude()
  habit: Habit;

  toJSON(): any {
    return classToPlain(this);
  }
}
