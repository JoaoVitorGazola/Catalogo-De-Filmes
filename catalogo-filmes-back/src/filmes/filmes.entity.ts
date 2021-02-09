import { Categoria } from 'src/categorias/categorias.entity';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { Base } from '../database/base.entity';

@Entity()
export class Filme extends Base {
  @Column({
    type: "varchar",
  })
  title: string;

  @Column({
    type: "varchar",
  })
  original_title: string;

  @Column({
    type: "varchar",
  })
  poster_path: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  overview: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  release_date: string;

  @Column({
    type: "float",
    nullable: true,
  })
  popularity: number;

  @ManyToMany(type => Categoria)
  @JoinTable()
  categorias: Categoria[];

}