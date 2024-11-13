import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  BadRequestException,
} from '@nestjs/common';
import { PaginationDto } from '@/dto/pagination';
import { ResponseMessage } from '@/decorators/message';
import { ProductService } from '@/modules/product/product.service';
import { CreateProductDto } from '@/modules/product/dto/create-product.dto';
import { UpdateProductDto } from '@/modules/product/dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ResponseMessage('Tạo sản phẩm thành công')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ResponseMessage('Lấy danh sách sản phẩm thành công')
  findAll(@Query() query: PaginationDto) {
    return this.productService.findAll(query);
  }

  @Get(':id')
  @ResponseMessage('Lấy thông tin sản phẩm thành công')
  findOne(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () => new BadRequestException('Id không hợp lệ'),
      }),
    )
    id: string,
  ) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Cập nhật thông tin sản phẩm thành công')
  update(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () => new BadRequestException('Id không hợp lệ'),
      }),
    )
    id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ResponseMessage('Xóa sản phẩm thành công')
  remove(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () => new BadRequestException('Id không hợp lệ'),
      }),
    )
    id: string,
  ) {
    return this.productService.remove(id);
  }
}
