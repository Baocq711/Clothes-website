import { Module } from '@nestjs/common';
import { ProductDetailService } from './product-detail.service';
import { ProductDetailController } from './product-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductDetail } from '@/modules/product-detail/entities/product-detail.entity';
import { Product } from '@/modules/product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductDetail, Product])],
  controllers: [ProductDetailController],
  providers: [ProductDetailService],
})
export class ProductDetailModule {}
