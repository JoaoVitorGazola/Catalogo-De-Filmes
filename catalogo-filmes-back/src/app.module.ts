import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TmdbController } from './tmdb/tmdb.controller';
import { TmdbService } from './tmdb/tmdb.service';
require('dotenv').config()

@Module({
  imports: [],
  controllers: [AppController, TmdbController],
  providers: [AppService, TmdbService],
})
export class AppModule {}
