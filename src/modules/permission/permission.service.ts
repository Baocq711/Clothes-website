import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from '@/modules/permission/entities/permission.entity';
import { In, Repository } from 'typeorm';
import { PaginationDto } from '@/dto/pagination';
import { Role } from '@/modules/role/entities/role.entity';
import { CreatePermissionDto } from '@/modules/permission/dto/create-permission.dto';
import { UpdatePermissionDto } from '@/modules/permission/dto/update-permission.dto';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,

    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
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

    const roles = await this.roleRepository.find({
      where: { id: In(createPermissionDto.roleIds) },
    });

    if (
      createPermissionDto.roleIds &&
      roles.length !== createPermissionDto.roleIds.length
    ) {
      throw new NotFoundException('Một hoặc nhiều role không tồn tại');
    }

    const permission = this.permissionRepository.create({
      ...createPermissionDto,
      roles,
    });
    const record = await this.permissionRepository.save(permission);
    return {
      id: record.id,
      createdAt: record.createdAt,
    };
  };

  findAll = async ({ page, limit }: PaginationDto) => {
    const [data, totalRecords] = await this.permissionRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['roles'],
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

  findOne = async (id: string) => {
    const permission = await this.permissionRepository.findOne({
      where: { id },
      relations: ['roles'],
    });
    if (!permission) {
      throw new BadRequestException('Id không tồn tại');
    }
    return permission;
  };

  update = async (id: string, updatePermissionDto: UpdatePermissionDto) => {
    const permissionUpdate = await this.permissionRepository.findOne({
      where: { id },
      relations: ['roles'],
    });
    if (!permissionUpdate) {
      throw new BadRequestException('Id không tồn tại');
    }

    const roles = await this.roleRepository.find({
      where: { id: In(updatePermissionDto.roleIds) },
    });

    if (
      updatePermissionDto.roleIds &&
      roles.length !== updatePermissionDto.roleIds.length
    ) {
      throw new NotFoundException('Một hoặc nhiều role không tồn tại');
    }
    await this.permissionRepository.update(id, updatePermissionDto);

    return {
      id: permissionUpdate.id,
      updatedAt: permissionUpdate.updatedAt,
    };
  };

  remove = async (id: string) => {
    const permission = await this.permissionRepository.findOne({
      where: { id },
      relations: ['roles'],
    });
    if (!permission) {
      throw new BadRequestException('Id không tồn tại');
    }
    const record = await this.permissionRepository.softRemove(permission);
    return {
      id: record.id,
      deletedAt: record.deletedAt,
    };
  };
}
