import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateHabitDto {
  @IsString()
  @MinLength(1)
  @MaxLength(40)
  title: string;

  @IsString()
  @MinLength(1)
  @MaxLength(400)
  description: string;

  @IsString()
  @MinLength(1)
  @MaxLength(40)
  periodType: string;

  @IsString()
  @MinLength(1)
  @MaxLength(40)
  periodFreq: string;
}
