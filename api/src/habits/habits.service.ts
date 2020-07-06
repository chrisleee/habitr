import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { User } from '../auth/user.entity';
import { SpreesService } from '../sprees/sprees.service';
import { AddLinkDto } from './dto/add-link-dto';
import { CreateHabitDto } from './dto/create-habit-dto';
import { DeleteLinkDto } from './dto/delete-link-dto';
import { Habit } from './habit.entity';
import { HabitRepository } from './habit.repository';

@Injectable()
export class HabitsService {
  constructor(
    @InjectRepository(HabitRepository)
    private habitRepository: HabitRepository,
    private spreesService: SpreesService,
  ) {}

  private logger = new Logger('HabitsService');

  async getHabits(user: User): Promise<Habit[]> {
    return this.habitRepository.getHabits(user);
  }

  async createHabit(
    createHabitDto: CreateHabitDto,
    user: User,
  ): Promise<Habit> {
    return this.habitRepository.createHabit(createHabitDto, user);
  }

  // TODO: Add try/catch
  async addLink(id: string, addLinkDto: AddLinkDto): Promise<Habit> {
    const habit = await this.habitRepository.findOne(id);
    await this.spreesService.addLink(habit, dayjs(addLinkDto.date));
    return habit;
  }

  // TODO: Add try/catch
  async deleteLink(id: string, deleteLinkDto: DeleteLinkDto): Promise<Habit> {
    const habit = await this.habitRepository.findOne(id);
    await this.spreesService.deleteLink(habit, dayjs(deleteLinkDto.date));
    return habit;
  }
}
