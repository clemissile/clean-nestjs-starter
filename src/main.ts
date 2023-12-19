import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appConstants } from './constants';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1');
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Example API')
    .setDescription('An example API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(appConstants.port);
  console.log(`[bootstrap] server is running on port: ${appConstants.port}`);
}
bootstrap();
