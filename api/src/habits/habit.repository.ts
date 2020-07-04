import { InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import { CreateHabitDto } from './dto/create-habit-dto';
import { Habit } from './habit.entity';
import { v4 as uuidv4 } from 'uuid';

@EntityRepository(Habit)
export class HabitRepository extends Repository<Habit> {
  private logger = new Logger('HabitRepository');

  async getHabits(user: User): Promise<Habit[]> {
    const query = this.createQueryBuilder('habit');
    query.leftJoinAndSelect('habit.sprees', 'sprees');
    query.leftJoinAndSelect('habit.user', 'user');
    query.where('habit.userId = :userId', { userId: user.id });

    try {
      const habits = await query.getMany();
      return habits;
    } catch (error) {
      this.logger.error(
        `Failed to get habits for user "${user.username}"`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createHabit(
    createHabitDto: CreateHabitDto,
    user: User,
  ): Promise<Habit> {
    const { title, description, periodType, periodFreq } = createHabitDto;

    const habit = new Habit();
    habit.id = uuidv4();
    habit.title = title;
    habit.description = description;
    habit.periodType = periodType;
    habit.periodFreq = periodFreq;
    habit.sprees = [];
    habit.isActive = true;
    habit.user = user;
    habit.userId = user.id;

    try {
      await habit.save();
    } catch (error) {
      this.logger.error(
        `Failed to create order for user "${user.id}, order "${habit.title}"`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }

    return habit;
  }
}
