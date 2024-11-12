import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@/modules/product/entities/product.entity';
import { ProductDetail } from '@/modules/product-detail/entities/product-detail.entity';
import { Review } from '@/modules/review/entities/review.entity';
import { Category } from '@/modules/category/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductDetail, Review, Category]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
