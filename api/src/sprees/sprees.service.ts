import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { Dayjs } from 'dayjs';
import {
  Equal,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
} from 'typeorm';
import { Habit } from '../habits/habit.entity';
import { Spree } from './spree.entity';
import { SpreeRepository } from './spree.repository';

@Injectable()
export class SpreesService {
  constructor(
    @InjectRepository(SpreeRepository)
    private spreeRepository: SpreeRepository,
  ) {}

  private logger = new Logger('SpreesService');

  async addLink(habit: Habit, date: Dayjs): Promise<void> {
    try {
      const spreeAfter = await this.spreeRepository.findOne({
        relations: ['habit'],
        where: {
          habit: { id: habit.id },
          start: Equal(date.add(1, 'day').toDate()),
          end: MoreThan(date.toDate()),
        },
      });
      const spreeBefore = await this.spreeRepository.findOne({
        relations: ['habit'],
        where: {
          habit: { id: habit.id },
          start: LessThan(date.toDate()),
          end: Equal(date.subtract(1, 'day').toDate()),
        },
      });

      if (spreeAfter && spreeBefore) {
        spreeAfter.start = spreeBefore.start;
        await spreeAfter.save();

        habit.sprees = habit.sprees.filter(
          (cand) => cand.id !== spreeBefore.id,
        );
        const foundSpree = habit.sprees.find(
          (cand) => cand.id === spreeAfter.id,
        );
        if (foundSpree) {
          foundSpree.start = spreeBefore.start;
        }

        await spreeBefore.remove();
      } else if (spreeAfter) {
        spreeAfter.start = date.toDate();
        await spreeAfter.save();

        const foundSpree = habit.sprees.find(
          (cand) => cand.id === spreeAfter.id,
        );
        foundSpree.start = date.toDate();
      } else if (spreeBefore) {
        spreeBefore.end = date.toDate();
        await spreeBefore.save();

        const foundSpree = habit.sprees.find(
          (cand) => cand.id === spreeBefore.id,
        );
        foundSpree.end = date.toDate();
      } else {
        const newSpree = new Spree();
        newSpree.start = date.toDate();
        newSpree.end = date.toDate();
        newSpree.habit = habit;
        await newSpree.save();

        habit.sprees.push(newSpree);
      }
    } catch (error) {
      this.logger.error(
        `Failed to add link for habit "${habit.id}"`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async deleteLink(habit: Habit, date: Dayjs): Promise<void> {
    try {
      const spree = await this.spreeRepository.findOne({
        relations: ['habit'],
        where: {
          habit: { id: habit.id },
          start: LessThanOrEqual(date.toDate()),
          end: MoreThanOrEqual(date.toDate()),
        },
      });
      if (!spree) {
        throw new InternalServerErrorException('Spree not found');
      }
      const startDate = dayjs(spree.start);
      const endDate = dayjs(spree.end);

      if (startDate.isSame(endDate) && startDate.isSame(date)) {
        habit.sprees = habit.sprees.filter((cand) => cand.id !== spree.id);

        await spree.remove();
      } else if (startDate.isSame(date)) {
        spree.start = date.add(1, 'day').toDate();
        await spree.save();

        const foundSpree = habit.sprees.find((cand) => cand.id === spree.id);
        foundSpree.start = spree.start;
      } else if (endDate.isSame(date)) {
        spree.end = date.subtract(1, 'day').toDate();
        await spree.save();

        const foundSpree = habit.sprees.find((cand) => cand.id === spree.id);
        foundSpree.end = spree.end;
      } else {
        // middle of spree
        const newSpree = new Spree();
        newSpree.start = date.add(1, 'day').toDate();
        newSpree.end = spree.end;
        newSpree.habit = habit;
        await newSpree.save();
        habit.sprees.push(newSpree);

        spree.end = date.subtract(1, 'day').toDate();
        await spree.save();
        const foundSpree = habit.sprees.find((cand) => cand.id === spree.id);
        foundSpree.end = spree.end;
      }
    } catch (error) {
      this.logger.error(
        `Failed to remove link for habit "${habit.id}"`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
