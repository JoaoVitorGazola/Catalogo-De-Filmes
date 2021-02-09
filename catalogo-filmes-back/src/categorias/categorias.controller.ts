import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CategoriasService } from './categorias.service';

@Controller('categorias')
export class CategoriasController {
    constructor(private categoriaService: CategoriasService) { }

    //@UseGuards(JwtAuthGuard)
    @Get('findAll')
    public async findAll() {
        return this.categoriaService.findAll();
    }
}
