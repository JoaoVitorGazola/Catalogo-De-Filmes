import { Injectable, Post } from '@nestjs/common';
const { MovieDb } = require('moviedb-promise')

@Injectable()
export class TmdbService {
    movieDb = new MovieDb(process.env.API_TMDB_KEY)
    constructor() { }

    public async buscarPorId(id: number) {
        return await this.movieDb.movieInfo({id: id, language: 'pt'})
  }
    public async maisBemAvaliados(){
        return await this.movieDb.movieTopRated({language: 'pt'});
    }
    
    public async imagemFilme(id: number){
        return await this.movieDb.movieImages({id: id, language: 'pt'});
    }

    public async generoDisponiveis(){
        return await this.movieDb.genreMovieList();
    }
}
