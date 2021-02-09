import { Entity, Column } from 'typeorm';
import { Base } from '../database/base.entity';

@Entity()
export class Categoria extends Base {
  @Column({
    type: "varchar",
  })
  name: string;
}