import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // #22.5: Global Validation Pipe - validate & transform data
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,       // Loại bỏ các field không có trong DTO
      forbidNonWhitelisted: true, // Báo lỗi nếu có field lạ
      transform: true,       // Tự động transform (string => number, v.v.)
    }),
  );

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
