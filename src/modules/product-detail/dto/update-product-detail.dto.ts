import { CreateProductDetailDto } from '@/modules/product-detail/dto/create-product-detail.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateProductDetailDto extends PartialType(
  CreateProductDetailDto,
) {}
