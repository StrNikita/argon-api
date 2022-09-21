import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import {
  SQL_DATABASE,
  SQL_HOST,
  SQL_PASSWORD,
  SQL_PORT,
  SQL_TYPE,
  SQL_USER,
} from './core/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: SQL_TYPE,
      host: SQL_HOST,
      port: SQL_PORT,
      username: SQL_USER,
      password: SQL_PASSWORD,
      database: SQL_DATABASE,
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      synchronize: true,
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
