import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HabitRepository } from './habit.repository';
import { User } from '../auth/user.entity';
import { Habit } from './habit.entity';
import { CreateHabitDto } from './dto/create-habit-dto';

@Injectable()
export class HabitsService {
  constructor(
    @InjectRepository(HabitRepository)
    private habitRepository: HabitRepository,
  ) {}

  async getHabits(user: User): Promise<Habit[]> {
    return this.habitRepository.getHabits(user);
  }

  async createHabit(
    createHabitDto: CreateHabitDto,
    user: User,
  ): Promise<Habit> {
    return this.habitRepository.createHabit(createHabitDto, user);
  }
}
