import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TmdbModule } from './tmdb/tmdb.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
require('dotenv').config();

@Module({
  imports: [TmdbModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
