import { Module } from '@nestjs/common';
import { HabitsController } from './habits.controller';
import { HabitsService } from './habits.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HabitRepository } from './habit.repository';
import { AuthModule } from '../auth/auth.module';
import { SpreesModule } from '../sprees/sprees.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([HabitRepository]),
    AuthModule,
    SpreesModule,
  ],
  controllers: [HabitsController],
  providers: [HabitsService],
})
export class HabitsModule {}
