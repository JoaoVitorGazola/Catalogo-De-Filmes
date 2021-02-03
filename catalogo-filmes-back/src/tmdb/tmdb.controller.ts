import { BadRequestException, Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TmdbService } from './tmdb.service';

@Controller('tmdb')
export class TmdbController {
    constructor(
        private readonly tmdbService: TmdbService
    ) { }

    @Get('buscarPorId/:id')
    public async buscarPorId(@Param('id') id: number) {
        if(!id)
            throw new BadRequestException;
        return await this.tmdbService.buscarPorId(id);
    }

    @Get('maisBemAvaliados')
    public async maisBemAvaliados(){
        return await this.tmdbService.maisBemAvaliados();
    }

    @Get('imagemFilme/:id')
    public async imagemFilme(@Param('id') id: number){
        if(!id)
            throw new BadRequestException;
        return this.tmdbService.imagemFilme(id);
    }

    @Get('generoDisponiveis')
    public async generoDisponiveis(){
        return this.tmdbService.generoDisponiveis();
    }
}
