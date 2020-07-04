import {
  Entity,
  BaseEntity,
  Column,
  OneToMany,
  PrimaryColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { User } from '../auth/user.entity';
import { Spree } from '../sprees/spree.entity';

@Entity()
export class Habit extends BaseEntity {
  @PrimaryColumn()
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
  user: User;

  @OneToMany((type) => Spree, (spree) => spree.habit, {
    eager: true,
    cascade: true,
  })
  sprees: Spree[];

  @OneToOne((type) => Spree, (spree) => spree.habit, {
    eager: true,
    cascade: true,
  })
  longestSpree: Spree[];
}
