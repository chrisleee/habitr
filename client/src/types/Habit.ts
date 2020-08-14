import type { SpreeData } from './Spree';

export type HabitData = {
  id: number;
  title: string;
  description: string;
  periodType: string;
  periodFreq: string;
  sprees: SpreeData[];
  isActive: boolean;
};
