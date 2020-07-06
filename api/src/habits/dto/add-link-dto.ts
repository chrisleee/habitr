import { IsString } from 'class-validator';

export class AddLinkDto {
  @IsString()
  date: string;
}
