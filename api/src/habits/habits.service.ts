import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { User } from '../auth/user.entity';
import { SpreesService } from '../sprees/sprees.service';
import { AddLinkDto } from './dto/add-link-dto';
import { CreateHabitDto } from './dto/create-habit-dto';
import { DeleteLinkDto } from './dto/delete-link-dto';
import { Habit } from './habit.entity';
import { HabitRepository } from './habit.repository';
import { UpdateHabitDto } from './dto/update-habit-dto';

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

  async getHabitById(id: string, user: User): Promise<Habit> {
    const habit = await this.habitRepository.findOne({
      relations: ['user'],
      where: { id, user: { id: user.id } },
    });

    if (!habit) {
      throw new NotFoundException(`Habit with id "${id}" not found!`);
    }

    return habit;
  }

  async createHabit(
    createHabitDto: CreateHabitDto,
    user: User,
  ): Promise<Habit> {
    return this.habitRepository.createHabit(createHabitDto, user);
  }

  async updateHabit(
    id: string,
    updateHabitDto: UpdateHabitDto,
    user: User,
  ): Promise<Habit> {
    const habit = await this.getHabitById(id, user);
    return this.habitRepository.updateHabit(habit, updateHabitDto, user);
  }

  async deleteHabit(id: string, user: User): Promise<void> {
    const result = await this.habitRepository.delete({
      id,
      user: { id: user.id },
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Habit "${id}" not found`);
    }
  }

  async addLink(id: string, addLinkDto: AddLinkDto): Promise<Habit> {
    const habit = await this.habitRepository.findOne(id);
    await this.spreesService.addLink(habit, dayjs(addLinkDto.date));
    return habit;
  }

  async deleteLink(id: string, deleteLinkDto: DeleteLinkDto): Promise<Habit> {
    const habit = await this.habitRepository.findOne(id);
    await this.spreesService.deleteLink(habit, dayjs(deleteLinkDto.date));
    return habit;
  }
}
