import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { TransformInterceptor } from 'src/interceptor/tranform';
import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard';
import { AppModule } from '@/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // VALIDATION
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Loại bỏ các thuộc tính không khai báo trong DTO
      forbidNonWhitelisted: true, // Trả lỗi nếu có thuộc tính không khai báo trong DTO
      transform: true, // Tự động chuyển đổi kiểu dữ liệu
    }),
  );

  // MIDDLEWARE
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new TransformInterceptor(reflector));
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  //VERSIONING
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1'],
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
