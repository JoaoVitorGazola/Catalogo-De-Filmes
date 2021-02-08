import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
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
    @Post('criarNovoPerfil')
    public async criarNovoPerfil(@Request() req, @Body('nome') nome: string) {
        return this.perfilService.criarNovoPerfil(JSON.parse(req.headers.user).id, nome);
    }
}
