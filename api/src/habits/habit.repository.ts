import { EntityRepository, Repository } from 'typeorm';
import { Habit } from './habit.entity';

@EntityRepository(Habit)
export class HabitRepository extends Repository<Habit> {}
