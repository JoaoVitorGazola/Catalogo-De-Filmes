import { Filme } from 'src/filmes/filmes.entity';
import { User } from 'src/users/users.entity';
import { Entity, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { Base } from '../database/base.entity';

@Entity()
export class Perfil extends Base {
  @ManyToOne(
    type => User, user => user.perfis, { nullable: true, onDelete: 'CASCADE' }
  )
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({
    type: "varchar",
    nullable: false,
  })
  nome: string;

  @ManyToMany(type => Filme)
  @JoinTable()
  filmesAssistidos: Filme[];

  @ManyToMany(type => Filme)
  @JoinTable()
  filmesParaAssistir: Filme[];

}