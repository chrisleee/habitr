import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { CreateHabitDto } from './dto/create-habit-dto';
import { Habit } from './habit.entity';
import { HabitsService } from './habits.service';

@Controller('habits')
@UseGuards(AuthGuard())
export class HabitsController {
  private logger = new Logger('HabitsController');

  constructor(private habitsService: HabitsService) {}

  @Get()
  getHabits(@GetUser() user: User): Promise<Habit[]> {
    this.logger.verbose(`User "${user.username}" retrieving all habits.`);

    return this.habitsService.getHabits(user);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createHabit(
    @Body() createHabitDto: CreateHabitDto,
    @GetUser() user: User,
  ): Promise<Habit> {
    this.logger.verbose(
      `User "${user.username}" creating a new order. Data: ${JSON.stringify({
        title: createHabitDto.title,
        description: createHabitDto.description,
        periodType: createHabitDto.periodType,
        periodFreq: createHabitDto.periodFreq,
      })}`,
    );
    return this.habitsService.createHabit(createHabitDto, user);
  }
}
