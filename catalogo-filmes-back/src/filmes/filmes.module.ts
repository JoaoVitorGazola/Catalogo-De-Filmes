import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { perfilProviders } from 'src/perfis/perfis.providers';
import { PerfisService } from 'src/perfis/perfis.service';
import { TmdbService } from 'src/tmdb/tmdb.service';
import { userProviders } from 'src/users/users.providers';
import { UsersService } from 'src/users/users.service';
import { filmeProviders } from './filmes.providers';
import { FilmesService } from './filmes.service';

@Module({
  imports: [DatabaseModule],
  providers: [FilmesService, ...filmeProviders, PerfisService, ...perfilProviders, TmdbService, UsersService, ...userProviders],
  exports: [FilmesService]
})
export class FilmesModule { }
