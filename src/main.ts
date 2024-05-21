import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join, resolve  } from 'path';

// import { ValidationPipe} from './shared/pipe/validation.pipe';
import { AppModule } from './app.module';
import { PrismaService } from './shared/prisma/prisma.service';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Read static file in folder views and public
  app.useStaticAssets(resolve('./src/views/assets'));
  app.setBaseViewsDir(resolve('./src/views/pages'));
  app.setViewEngine('ejs');

  // const config = new DocumentBuilder()
  //   .setTitle('BOOKSTORE API')
  //   .setDescription('API for book store project')
  //   .setVersion('0.1')
  //   .build();

  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
