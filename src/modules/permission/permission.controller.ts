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
import { ResponseMessage } from '@/decorators/message';
import { PermissionService } from '@/modules/permission/permission.service';
import { CreatePermissionDto } from '@/modules/permission/dto/create-permission.dto';
import { UpdatePermissionDto } from '@/modules/permission/dto/update-permission.dto';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  @ResponseMessage('Tạo chi tiết sản phẩm thành công')
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }

  @Get()
  @ResponseMessage('Lấy danh sách chi tiết sản phẩm thành công')
  findAll(@Query() query: PaginationDto) {
    return this.permissionService.findAll(query);
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
    return this.permissionService.findOne(id);
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
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permissionService.update(id, updatePermissionDto);
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
    return this.permissionService.remove(id);
  }
}
