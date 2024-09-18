import { NestFactory } from '@nestjs/core';
import { AppModule } from '..\..\LibraryProject\library\src';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // מאפשר CORS
  await app.listen(3000);
}
bootstrap();
