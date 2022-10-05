import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  console.log('RPOCESS ENV', process.env);
  const app = await NestFactory.create(AppModule);

  await app.listen(4000);
}
bootstrap();
