import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from 'src/users/users.providers';
import { UsersService } from 'src/users/users.service';
import { PerfisController } from './perfis.controller';
import { perfilProviders } from './perfis.providers';
import { PerfisService } from './perfis.service';

@Module({
    imports: [DatabaseModule],
    providers: [PerfisService, ...perfilProviders, UsersService, ...userProviders],
    exports: [PerfisService],
    controllers: [PerfisController]
})
export class PerfisModule {}
