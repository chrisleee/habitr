import { Module } from '@nestjs/common';
import { SpreesService } from './sprees.service';
import { SpreeRepository } from './spree.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SpreeRepository])],
  providers: [SpreesService],
  exports: [SpreesService],
})
export class SpreesModule {}
