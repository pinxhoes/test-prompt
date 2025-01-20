import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './modules/user/UserModule';
import {User} from "./modules/user/UserEntity";
import {MockupData} from "./config/MockupData";

@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true,
      }),
      TypeOrmModule.forRoot(typeOrmConfig),
      TypeOrmModule.forFeature([User]),
      UserModule
  ],
  controllers: [AppController],
  providers: [
      AppService,
      MockupData
  ],
})
export class AppModule {}
