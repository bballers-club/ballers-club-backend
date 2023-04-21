import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { config } from "dotenv"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  config()

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Ballers Club API')
    .setDescription('Welcome to the Ballers Club API documentation')
    .setVersion('1.0')
    .addTag('ballers club')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('ballers-club-api', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
