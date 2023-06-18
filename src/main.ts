import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

config();

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors();
	app.setGlobalPrefix('api');

	const swaggerConfig = new DocumentBuilder()
		.setTitle('Ballers Club API')
		.setDescription('Welcome to the Ballers Club API documentation')
		.setVersion('1.0')
		.addTag('ballers-club')
		.build();

	const document = SwaggerModule.createDocument(app, swaggerConfig);

	SwaggerModule.setup('ballers-club-api', app, document, {
		customSiteTitle: 'Ballers Club Swagger',
	});

	await app.listen(process.env.PORT);
}

export const supabaseClient = createClient(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_KEY,
	{
		auth: {
			autoRefreshToken: true,
			detectSessionInUrl: false,
			persistSession : false
		},
	},
);

bootstrap();
