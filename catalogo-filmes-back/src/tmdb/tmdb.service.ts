import { Injectable } from '@nestjs/common';
const { MovieDb } = require('moviedb-promise')

@Injectable()
export class TmdbService {
    movieDb = new MovieDb(process.env.API_TMDB_KEY)
    constructor() { }

    public async buscarPorId(id: number) {
        return await this.movieDb.movieInfo({ id: id, language: 'pt-BR' })
    }
    public async maisBemAvaliados(pagina?: number) {
        return await this.movieDb.movieTopRated({ language: 'pt-BR', page: pagina || 1 });
    }

    public async generoDisponiveis() {
        return (await this.movieDb.genreMovieList({ language: 'pt-BR' })).genres;
    }

    public async filmesPorTermo(termo: string, pagina?: number) {
        return await this.movieDb.searchMovie({ query: termo, language: 'pt-BR', page: pagina || 1 });
    }

    public async filmesPorGenero(id: string, pagina?: number) {
        return await this.movieDb.movieTopRated({ with_genres: id, language: 'pt-BR', page: pagina || 1 });
    }
}
