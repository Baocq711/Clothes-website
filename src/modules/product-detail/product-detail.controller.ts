import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { PaginationDto } from '@/dto/pagination';
import { ProductDetailService } from '@/modules/product-detail/product-detail.service';
import { CreateProductDetailDto } from '@/modules/product-detail/dto/create-product-detail.dto';
import { UpdateProductDetailDto } from '@/modules/product-detail/dto/update-product-detail.dto';

@Controller('product-detail')
export class ProductDetailController {
  constructor(private readonly productDetailService: ProductDetailService) {}

  @Post()
  create(@Body() createProductDetailDto: CreateProductDetailDto) {
    return this.productDetailService.create(createProductDetailDto);
  }

  @Get()
  findAll(@Query() query: PaginationDto) {
    return this.productDetailService.findAll(query);
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () => new BadRequestException('Id không hợp lệ'),
      }),
    )
    id: string,
  ) {
    return this.productDetailService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () => new BadRequestException('Id không hợp lệ'),
      }),
    )
    id: string,
    @Body() updateProductDetailDto: UpdateProductDetailDto,
  ) {
    return this.productDetailService.update(id, updateProductDetailDto);
  }

  @Delete(':id')
  remove(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () => new BadRequestException('Id không hợp lệ'),
      }),
    )
    id: string,
  ) {
    return this.productDetailService.remove(id);
  }
}
