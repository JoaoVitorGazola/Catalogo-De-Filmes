import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TmdbModule } from './tmdb/tmdb.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { PerfisModule } from './perfis/perfis.module';
import { FilmesModule } from './filmes/filmes.module';
import { CategoriasModule } from './categorias/categorias.module';
require('dotenv').config();

@Module({
  imports: [TmdbModule, AuthModule, UsersModule, DatabaseModule, PerfisModule, FilmesModule, CategoriasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
