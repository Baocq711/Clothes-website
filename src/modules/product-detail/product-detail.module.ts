import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductDetail } from '@/modules/product-detail/entities/product-detail.entity';
import { Product } from '@/modules/product/entities/product.entity';
import { ProductDetailService } from '@/modules/product-detail/product-detail.service';
import { ProductDetailController } from '@/modules/product-detail/product-detail.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductDetail, Product])],
  controllers: [ProductDetailController],
  providers: [ProductDetailService],
})
export class ProductDetailModule {}
