import { BadRequestException, Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Filme } from 'src/filmes/filmes.entity';
import { Perfil } from './perfil.entity';
import { PerfisService } from './perfis.service';

@Controller('perfil')
export class PerfisController {
    constructor(private perfilService: PerfisService) { }

    @UseGuards(JwtAuthGuard)
    @Get('buscarPorUserId')
    public async buscarPorUserId(@Request() req) {
        return this.perfilService.buscarPorUserId(JSON.parse(req.headers.user).id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('adicionarAFilmesAssistidos')
    public async adicionarAFilmesAssistidos(@Body('perfil') perfil: Perfil, @Body('filme') filme: Filme) {
        if (!perfil || !filme)
            throw new BadRequestException("Envie um perfil para buscar");
        return this.perfilService.adicionarAFilmesAssistidos(perfil, filme);
    }

    @UseGuards(JwtAuthGuard)
    @Post('adicionarAFilmesParaAssistir')
    public async adicionarAFilmesParaAssistir(@Body('perfil') perfil: Perfil, @Body('filme') filme: Filme) {
        if (!perfil || !filme)
            throw new BadRequestException("Envie um perfil para buscar");
        return this.perfilService.adicionarAFilmesParaAssistir(perfil, filme);
    }

    @UseGuards(JwtAuthGuard)
    @Post('filmesSugeridos')
    public async filmesSugeridos(@Body('perfil') perfil: Perfil, @Body('pagina') pagina: number) {
        if (!perfil)
            throw new BadRequestException("Envie um perfil para buscar");
        return this.perfilService.filmesSugeridos(perfil, pagina);
    }

    @UseGuards(JwtAuthGuard)
    @Post('criarNovoPerfil')
    public async criarNovoPerfil(@Request() req, @Body('nome') nome: string) {
        return this.perfilService.criarNovoPerfil(JSON.parse(req.headers.user).id, nome);
    }
}
