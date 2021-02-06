import { Injectable } from '@nestjs/common';
const { MovieDb } = require('moviedb-promise')

@Injectable()
export class TmdbService {
    movieDb = new MovieDb(process.env.API_TMDB_KEY)
    constructor() { }

    public async buscarPorId(id: number) {
        return await this.movieDb.movieInfo({id: id, language: 'pt-BR'})
  }
    public async maisBemAvaliados(){
        return await this.movieDb.movieTopRated({language: 'pt-BR'});
    }
    
    public async imagemFilme(id: number){
        return await this.movieDb.movieImages({id: id, language: 'pt-BR'});
    }

    public async generoDisponiveis(){
        return await this.movieDb.genreMovieList({language: 'pt-BR'});
    }

    public async filmesPorTermo(termo: string){
        return await this.movieDb.searchMovie({query: termo, language: 'pt-BR'});
    }

    public async filmesPorGenero(id: string){
        return await this.movieDb.movieTopRated({with_genres: id, language: 'pt-BR'});
    }
}
