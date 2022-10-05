import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import config from './common/configs/config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GqlConfigService } from './gql-config.service';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres' as Dialect,
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        logging: false,
        // dialect: configService.get('database.dialect'),
        // host: configService.get('database.host'),
        // port: +configService.get('database.port'),
        // username: configService.get('database.username'),
        // password: configService.get('database.password'),
        // database: configService.get('database.database'),
        autoLoadModels: true,
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
