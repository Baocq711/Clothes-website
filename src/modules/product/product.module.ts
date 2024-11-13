import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@/modules/product/entities/product.entity';
import { ProductDetail } from '@/modules/product-detail/entities/product-detail.entity';
import { Review } from '@/modules/review/entities/review.entity';
import { Category } from '@/modules/category/entities/category.entity';
import { ProductController } from '@/modules/product/product.controller';
import { ProductService } from '@/modules/product/product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductDetail, Review, Category]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
