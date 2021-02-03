import { Module } from '@nestjs/common';
import { TmdbController } from './tmdb.controller';
import { TmdbService } from './tmdb.service';

@Module({
    imports: [],
    controllers: [TmdbController],
    providers: [TmdbService],
  })
export class TmdbModule {}
