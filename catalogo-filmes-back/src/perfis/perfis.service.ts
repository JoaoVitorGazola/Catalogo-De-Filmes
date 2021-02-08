import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Perfil } from './perfil.entity';

@Injectable()
export class PerfisService {
    constructor(
      @Inject('PERFIL_REPOSITORY')
      private perfilRepository: Repository<Perfil>,
      private userService: UsersService
    ) { }
  
    public async findAll(): Promise<Perfil[]> {
      return this.perfilRepository.find();
    }
  
    public async findById(id: number): Promise<Perfil | undefined> {
      return await this.perfilRepository.findOne({
        where: {
          id: id
        }
      });
    }
  
    public async buscarPorUserId(userId: number) {
        return await this.perfilRepository.find({
            where: {
                user: {
                    id: userId
                }
            }
        })
    }

    public async criarNovoPerfil(userId, nome){
      var user = await this.userService.findById(userId);
      if(!user)
        throw new BadRequestException("Usuário não encontrado");

      var novoPerfil: Perfil = new Perfil();
      novoPerfil.user = user;
      novoPerfil.nome = nome;
      var perfil = this.perfilRepository.create(novoPerfil);
      return await this.perfilRepository.save(perfil);
    }
  
  }
