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
import { CategoryService } from '@/modules/category/category.service';
import { CreateCategoryDto } from '@/modules/category/dto/create-category.dto';
import { UpdateCategoryDto } from '@/modules/category/dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ResponseMessage('Tạo danh mục thành công')
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ResponseMessage('Lấy danh sách danh mục thành công')
  findAll(@Query() query: PaginationDto) {
    return this.categoryService.findAll(query);
  }

  @Get(':id')
  @ResponseMessage('Lấy thông tin danh mục thành công')
  findOne(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () => new BadRequestException('Id không hợp lệ'),
      }),
    )
    id: string,
  ) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Cập nhật thông tin danh mục thành công')
  update(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () => new BadRequestException('Id không hợp lệ'),
      }),
    )
    id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ResponseMessage('Xóa danh mục thành công')
  remove(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () => new BadRequestException('Id không hợp lệ'),
      }),
    )
    id: string,
  ) {
    return this.categoryService.remove(id);
  }
}
