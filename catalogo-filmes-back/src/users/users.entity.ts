import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from '../database/base.entity';

@Entity()
export class User extends Base {
    @Column({
      type: "varchar",
      nullable: false,
    })
    email: string;
  
    @Column({
      type: "varchar",
      nullable: false,
    })
    password: string;
  
    @Column({
      type: "varchar",
      nullable: true,
    })
    facebook_id: string;
  
}