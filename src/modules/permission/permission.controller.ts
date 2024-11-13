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
import { ProductDetailService } from './product-detail.service';
import { CreateProductDetailDto } from './dto/create-product-detail.dto';
import { UpdateProductDetailDto } from './dto/update-product-detail.dto';
import { PaginationDto } from '@/dto/pagination';
import { ResponseMessage } from '@/decorators/message';

@Controller('product-detail')
export class ProductDetailController {
  constructor(private readonly productDetailService: ProductDetailService) {}

  @Post()
  @ResponseMessage('Tạo chi tiết sản phẩm thành công')
  create(@Body() createProductDetailDto: CreateProductDetailDto) {
    return this.productDetailService.create(createProductDetailDto);
  }

  @Get()
  @ResponseMessage('Lấy danh sách chi tiết sản phẩm thành công')
  findAll(@Query() query: PaginationDto) {
    return this.productDetailService.findAll(query);
  }

  @Get(':id')
  @ResponseMessage('Lấy thông tin chi tiết sản phẩm thành công')
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
  @ResponseMessage('Cập nhật thông tin chi tiết sản phẩm thành công')
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
  @ResponseMessage('Xóa chi tiết sản phẩm thành công')
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
