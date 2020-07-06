import { IsString } from 'class-validator';

export class DeleteLinkDto {
  @IsString()
  date: string;
}
