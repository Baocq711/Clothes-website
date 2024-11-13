import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '@/modules/category/entities/category.entity';
import { Product } from '@/modules/product/entities/product.entity';
import { CategoryController } from '@/modules/category/category.controller';
import { CategoryService } from '@/modules/category/category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
