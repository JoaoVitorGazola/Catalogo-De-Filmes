import { Inject, Injectable } from '@nestjs/common';
import { TmdbService } from 'src/tmdb/tmdb.service';
import { Repository } from 'typeorm';
import { Filme } from './filmes.entity';

@Injectable()
export class FilmesService {
  constructor(
    @Inject('FILME_REPOSITORY')
    private filmeRepository: Repository<Filme>,
    private tmdbService: TmdbService
  ) { }

  public async salvarFilme(filme: Filme) {
    var filmeJson = await this.tmdbService.buscarPorId(filme.id);
    filme.id = filmeJson.id;
    filme.title = filmeJson.title;
    filme.original_title = filmeJson.original_title;
    filme.poster_path = filmeJson.poster_path;
    filme.overview = filmeJson.overview;
    filme.popularity = filmeJson.popularity;
    filme.categorias = filmeJson.genres;
    filme.release_date = filmeJson.release_date;
    var novoFilme = this.filmeRepository.create(filme);
    return await this.filmeRepository.save(novoFilme);
  }
}
