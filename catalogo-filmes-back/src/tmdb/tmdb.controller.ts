import { BadRequestException, Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TmdbService } from './tmdb.service';

@Controller('tmdb')
export class TmdbController {
    constructor(
        private readonly tmdbService: TmdbService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get('buscarPorId/:id')
    public async buscarPorId(@Param('id') id: number) {
        if (!id)
            throw new BadRequestException;
        return await this.tmdbService.buscarPorId(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('maisBemAvaliados')
    public async maisBemAvaliados(@Body('pagina') pagina: number) {
        return await this.tmdbService.maisBemAvaliados(pagina);
    }

    @UseGuards(JwtAuthGuard)
    @Get('generoDisponiveis')
    public async generoDisponiveis() {
        return await this.tmdbService.generoDisponiveis();
    }

    @UseGuards(JwtAuthGuard)
    @Post('filmesPorTermo')
    public async filmesPorTermo(@Body('termo') termo: string, @Body('pagina') pagina: number) {
        if (!termo)
            throw new BadRequestException("Envie um termo para buscar")
        return await this.tmdbService.filmesPorTermo(termo, pagina);
    }

    @UseGuards(JwtAuthGuard)
    @Post('filmesPorGenero/:id')
    public async filmesPorGenero(@Param('id') id: string, @Body('pagina') pagina: number) {
        if (!id)
            throw new BadRequestException("Envie um id de genero para buscar")
        return await this.tmdbService.filmesPorGenero(id, pagina);
    }
}
