import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { filmeProviders } from 'src/filmes/filmes.providers';
import { FilmesService } from 'src/filmes/filmes.service';
import { TmdbService } from 'src/tmdb/tmdb.service';
import { userProviders } from 'src/users/users.providers';
import { UsersService } from 'src/users/users.service';
import { PerfisController } from './perfis.controller';
import { perfilProviders } from './perfis.providers';
import { PerfisService } from './perfis.service';

@Module({
    imports: [DatabaseModule],
    providers: [PerfisService, ...perfilProviders, UsersService, ...userProviders, FilmesService, ...filmeProviders, TmdbService],
    exports: [PerfisService],
    controllers: [PerfisController]
})
export class PerfisModule { }
