import { EntityRepository, Repository } from 'typeorm';
import { Spree } from './spree.entity';

@EntityRepository(Spree)
export class SpreeRepository extends Repository<Spree> {}
