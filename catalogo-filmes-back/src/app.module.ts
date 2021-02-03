import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TmdbModule } from './tmdb/tmdb.module';
require('dotenv').config()

@Module({
  imports: [TmdbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
