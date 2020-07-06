import { classToPlain, Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../auth/user.entity';
import { Spree } from '../sprees/spree.entity';

@Entity()
export class Habit extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  periodType: string;

  @Column()
  periodFreq: string;

  @Column()
  isActive: boolean;

  @ManyToOne((type) => User, (user) => user.habits, { cascade: true })
  @Exclude({ toPlainOnly: true })
  user: User;

  @Column()
  userId: number;

  @OneToMany((type) => Spree, (spree) => spree.habit, {
    eager: true,
    cascade: true,
  })
  sprees: Spree[];

  toJSON(): any {
    return classToPlain(this);
  }
}
