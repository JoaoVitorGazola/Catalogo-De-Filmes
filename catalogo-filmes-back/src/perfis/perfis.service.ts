import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Filme } from 'src/filmes/filmes.entity';
import { FilmesService } from 'src/filmes/filmes.service';
import { TmdbService } from 'src/tmdb/tmdb.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Perfil } from './perfil.entity';

@Injectable()
export class PerfisService {
  constructor(
    @Inject('PERFIL_REPOSITORY')
    private perfilRepository: Repository<Perfil>,
    private filmeService: FilmesService,
    private userService: UsersService,
    private tmdbService: TmdbService
  ) { }

  public async findAll(): Promise<Perfil[]> {
    return this.perfilRepository.find();
  }

  public async findById(id: number): Promise<Perfil | undefined> {
    return await this.perfilRepository.findOne({
      where: {
        id: id
      },
      relations: ['filmesAssistidos', 'filmesParaAssistir', 'filmesAssistidos.categorias', 'filmesParaAssistir.categorias']
    });
  }

  public async buscarPorUserId(userId: number) {
    return await this.perfilRepository.find({
      where: {
        user: {
          id: userId
        }
      },
      relations: ['filmesAssistidos', 'filmesParaAssistir']
    })
  }

  public async criarNovoPerfil(userId, nome) {
    var user = await this.userService.findById(userId);
    if (!user)
      throw new BadRequestException("Usuário não encontrado");

    var novoPerfil: Perfil = new Perfil();
    novoPerfil.user = user;
    novoPerfil.nome = nome;
    var perfil = this.perfilRepository.create(novoPerfil);
    return await this.perfilRepository.save(perfil);
  }

  public async adicionarAFilmesAssistidos(perfil: Perfil, filme: Filme) {
    var perfil = await this.findById(perfil.id);
    if (!perfil)
      throw new BadRequestException("Perfil não encontrado");
    var filme = await this.filmeService.salvarFilme(filme);
    perfil.filmesAssistidos.push(filme);
    await this.perfilRepository.save(perfil);
    return await this.findById(perfil.id);
  }

  public async adicionarAFilmesParaAssistir(perfil: Perfil, filme: Filme) {
    var perfil = await this.findById(perfil.id);
    if (!perfil)
      throw new BadRequestException("Perfil não encontrado");
    var filme = await this.filmeService.salvarFilme(filme);
    perfil.filmesParaAssistir.push(filme);
    await this.perfilRepository.save(perfil);
    return await this.findById(perfil.id);
  }

  public async filmesSugeridos(perfil: Perfil, pagina: number) {
    var perfil = await this.findById(perfil.id);
    if (!perfil)
      throw new BadRequestException("Perfil não encontrado");
    if (!perfil.filmesAssistidos)
      return this.tmdbService.maisBemAvaliados(pagina);
    var categorias = [];
    for (var i = 0; i < perfil.filmesAssistidos.length; i++) {
      for (var j = 0; j < perfil.filmesAssistidos[i].categorias.length; j++) {
        if (!categorias[perfil.filmesAssistidos[i].categorias[j].id])
          categorias[perfil.filmesAssistidos[i].categorias[j].id] = 0;
        categorias[perfil.filmesAssistidos[i].categorias[j].id]++;
      }
    }
    var idCategoriaMaisAssistida;
    var valorCategoriaMaisAssistida = 0;
    for (var i = 0; i < categorias.length; i++) {
      if (categorias[i] > valorCategoriaMaisAssistida) {
        idCategoriaMaisAssistida = i;
        valorCategoriaMaisAssistida = categorias[i];
      }
    }
    return this.tmdbService.filmesPorGenero(idCategoriaMaisAssistida, pagina);
  }
}
