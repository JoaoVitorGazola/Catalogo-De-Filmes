import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
const bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) { }

  public async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  public async findOne(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: {
        email: email
      }
    });
  }

  public async newUser(newUser: User) {
    var user = await this.findOne(newUser.email);
    if (user)
      throw new ConflictException("Usuário já cadastrado");
    var userFormatado = {
      email: newUser.email,
      password: await bcrypt.hash(newUser.password, Number(process.env.BCRYPT_ROUNDS))
    }
    user = this.userRepository.create(userFormatado);
    return await this.userRepository.save(user);
  }

}