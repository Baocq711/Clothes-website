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
import { RoleService } from '@/modules/role/role.service';
import { CreateRoleDto } from '@/modules/role/dto/create-role.dto';
import { UpdateRoleDto } from '@/modules/role/dto/update-role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ResponseMessage('Tạo vai trò thành công')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  @ResponseMessage('Lấy danh sách vai trò thành công')
  findAll(@Query() query: PaginationDto) {
    return this.roleService.findAll(query);
  }

  @Get(':id')
  @ResponseMessage('Lấy thông tin vai trò thành công')
  findOne(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () => new BadRequestException('Id không hợp lệ'),
      }),
    )
    id: string,
  ) {
    return this.roleService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Cập nhật thông tin vai trò thành công')
  update(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () => new BadRequestException('Id không hợp lệ'),
      }),
    )
    id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.roleService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @ResponseMessage('Xóa vai trò thành công')
  remove(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () => new BadRequestException('Id không hợp lệ'),
      }),
    )
    id: string,
  ) {
    return this.roleService.remove(id);
  }
}
