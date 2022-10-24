import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

//import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
      {
          transport : Transport.KAFKA,
          options : {
              client : {
                  brokers : ['kafka:9092']
              },
              consumer : {
                  groupId : 'users-consumer',
                  allowAutoTopicCreation: true
              }
          }
      }
  );

  app.listen();
}
bootstrap();
