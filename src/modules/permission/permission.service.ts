import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from '@/modules/permission/entities/permission.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '@/dto/pagination';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  create = async (createPermissionDto: CreatePermissionDto) => {
    if (
      await this.permissionRepository.findOneBy({
        apiPath: createPermissionDto.apiPath,
        method: createPermissionDto.method,
      })
    ) {
      throw new BadRequestException('Quyền hạn đã tồn tại');
    }

    const newPermission = await this.permissionRepository.save(
      this.permissionRepository.create(createPermissionDto),
    );
    return {
      id: newPermission.id,
      createdAt: newPermission.createdAt,
    };
  };

  findAll = async ({ page, limit }: PaginationDto) => {
    const [data, totalRecords] = await this.permissionRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalPages = Math.ceil(totalRecords / limit);

    return {
      pagination: {
        page,
        limit,
        totalRecords,
        totalPages,
      },
      data,
    };
  };

  findOneById = async (id: string) => {
    const permission = await this.permissionRepository.findOneBy({ id });
    if (!permission) {
      throw new BadRequestException('Id không tồn tại');
    }
    return permission;
  };

  update = async (id: string, updatePermissionDto: UpdatePermissionDto) => {
    if (!(await this.permissionRepository.findOneBy({ id }))) {
      throw new BadRequestException('Id không tồn tại');
    }
    return await this.permissionRepository.update(id, updatePermissionDto);
  };

  remove = async (id: string) => {
    const deletePermission = await this.permissionRepository.findOneBy({ id });
    if (!deletePermission) {
      throw new BadRequestException('Id không tồn tại');
    }
    return await this.permissionRepository.softRemove(deletePermission);
  };
}
