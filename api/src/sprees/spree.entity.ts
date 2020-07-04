import { Entity, BaseEntity, PrimaryColumn, ManyToOne, Column } from 'typeorm';
import { Habit } from '../habits/habit.entity';

@Entity()
export class Spree extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  start: Date;

  @Column()
  end: Date;

  @ManyToOne((type) => Habit, (habit) => habit.sprees, { cascade: true })
  habit: Habit;
}
