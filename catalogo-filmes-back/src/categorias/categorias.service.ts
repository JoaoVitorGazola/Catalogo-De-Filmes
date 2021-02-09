import { Inject, Injectable } from '@nestjs/common';
import { TmdbService } from 'src/tmdb/tmdb.service';
import { Repository } from 'typeorm';
import { Categoria } from './categorias.entity';

@Injectable()
export class CategoriasService {
    constructor(
        @Inject('CATEGORIA_REPOSITORY')
        private categoriaRepository: Repository<Categoria>,
        private tmdbService: TmdbService
    ) { }

    public async findAll(): Promise<Categoria[]> {
        var categorias: Categoria = await this.tmdbService.generoDisponiveis();
        await this.categoriaRepository.save(categorias);
        return this.categoriaRepository.find({
            order: {
                name: 'ASC'
            }
        });
    }
}
