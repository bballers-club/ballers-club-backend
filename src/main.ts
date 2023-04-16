import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Ballers Club API')
    .setDescription('Welcome to the Ballers Club API documentation')
    .setVersion('1.0')
    .addTag('ballers club')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('ballers-club-api', app, document);


  await app.listen(3000);
}
bootstrap();
