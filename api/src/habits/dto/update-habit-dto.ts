import {
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class UpdateHabitDto {
  @IsString()
  @MinLength(1)
  @MaxLength(40)
  @IsOptional()
  title: string;

  @IsString()
  @MinLength(1)
  @MaxLength(400)
  @IsOptional()
  description: string;

  @IsString()
  @MinLength(1)
  @MaxLength(40)
  @IsOptional()
  periodType: string;

  @IsString()
  @MinLength(1)
  @MaxLength(40)
  @IsOptional()
  periodFreq: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
