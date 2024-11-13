import { AuthModule } from '@/modules/auth/auth.module';
import { CategoryModule } from '@/modules/category/category.module';
import { ContactModule } from '@/modules/contact/contact.module';
import { DatabaseModule } from '@/modules/database/database.module';
import { PermissionModule } from '@/modules/permission/permission.module';
import { ProductDetailModule } from '@/modules/product-detail/product-detail.module';
import { ProductModule } from '@/modules/product/product.module';
import { ReviewModule } from '@/modules/review/review.module';
import { RoleModule } from '@/modules/role/role.module';
import { UserModule } from '@/modules/user/user.module';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ms from 'ms';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [__dirname + '/modules/**/entities/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    CacheModule.register({
      ttl: ms(process.env.CACHE_EXPIRES) / 1000, // Cache TTL in seconds
      max: +process.env.CACHE_MAX, // Maximum number of items in cache
      isGlobal: true,
    }),

    UserModule,
    ContactModule,
    RoleModule,
    PermissionModule,
    AuthModule,
    DatabaseModule,
    ProductModule,
    ProductDetailModule,
    ReviewModule,
    CategoryModule,
  ],
})
export class AppModule {}
