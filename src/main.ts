import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { config } from './config/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
  );
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'staging'
  ) {
    const documentOptions = new DocumentBuilder()
      .setTitle('Store Docs')
      .setDescription('Store management app')
      .setVersion('v1')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Enter JWT token',
          in: 'header',
        },
        'jwt',
      )
      .build();
    const document = SwaggerModule.createDocument(app, documentOptions);
    SwaggerModule.setup('docs', app, document);
  }

  app.enableCors();
  app.use(helmet());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const PORT: any = config.web.port;

  await app.listen(PORT);
}
bootstrap();
