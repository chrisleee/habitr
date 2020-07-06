import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { AddLinkDto } from './dto/add-link-dto';
import { CreateHabitDto } from './dto/create-habit-dto';
import { DeleteLinkDto } from './dto/delete-link-dto';
import { Habit } from './habit.entity';
import { HabitsService } from './habits.service';

@Controller('habits')
@UseGuards(AuthGuard())
export class HabitsController {
  constructor(private habitsService: HabitsService) {}

  private logger = new Logger('HabitsController');

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

  @Post('/:id/links')
  @UsePipes(new ValidationPipe({ transform: true }))
  addLink(
    @Param('id') id: string,
    @Body() addLinkDto: AddLinkDto,
    @GetUser() user: User,
  ): Promise<Habit> {
    this.logger.verbose(
      `User "${user.username}" adding a link. Date: "${addLinkDto.date}" for habit "${id}"`,
    );
    return this.habitsService.addLink(id, addLinkDto);
  }

  @Delete('/:id/links')
  @UsePipes(new ValidationPipe({ transform: true }))
  deleteLink(
    @Param('id') id: string,
    @Body() deleteLinkDto: DeleteLinkDto,
    @GetUser() user: User,
  ): Promise<Habit> {
    this.logger.verbose(
      `User "${user.username}" deleting a link. Date: "${deleteLinkDto.date}" for habit "${id}"`,
    );
    return this.habitsService.deleteLink(id, deleteLinkDto);
  }
}
