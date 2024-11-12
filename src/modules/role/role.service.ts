import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '@/modules/role/entities/role.entity';
import { In, Repository } from 'typeorm';
import { Permission } from '@/modules/permission/entities/permission.entity';
import { PaginationDto } from '@/dto/pagination';
import { isNotEmptyObject } from 'class-validator';
@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
  ) {}

  create = async (createRoleDto: CreateRoleDto) => {
    if (await this.rolesRepository.findOneBy({ name: createRoleDto.name })) {
      throw new BadRequestException('Role đã tồn tại');
    }

    const { permissionIds, ...roleData } = createRoleDto;
    const role = this.rolesRepository.create(roleData);
    role.permissions = await this.getPermissions(createRoleDto.permissionIds);

    const record = await this.rolesRepository.save(role);
    return {
      id: record.id,
      createdAt: record.createdAt,
    };
  };

  findAll = async ({ page, limit }: PaginationDto) => {
    const [data, totalRecords] = await this.rolesRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['permissions'],
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
    const role = await this.rolesRepository.findOne({
      where: { id },
      relations: ['permissions'],
    });
    if (!role) {
      throw new BadRequestException('Role không tồn tại');
    }
    return role;
  };

  update = async (id: string, updateRoleDto: UpdateRoleDto) => {
    const role = await this.rolesRepository.findOne({
      where: { id },
      relations: ['permissions'],
    });
    if (!role) {
      throw new BadRequestException('Id không tồn tại');
    }

    if (!isNotEmptyObject(updateRoleDto)) {
      throw new BadRequestException('Không có dữ liệu để cập nhật');
    }

    const { permissionIds, ...roleData } = updateRoleDto;
    const updateRole = this.rolesRepository.create(roleData);
    updateRole.permissions = await this.getPermissions(
      updateRoleDto.permissionIds,
    );

    return await this.rolesRepository.update(id, updateRole);
  };

  remove = async (id: string) => {
    const deleteUser = await this.rolesRepository.findOne({
      where: { id },
    });
    if (!deleteUser) {
      throw new BadRequestException('Id không tồn tại');
    }

    return await this.rolesRepository.softRemove(deleteUser);
  };

  getPermissions = async (permissionIds: string[]): Promise<Permission[]> => {
    if (permissionIds.length === 0) {
      return [];
    }

    return await this.permissionsRepository.find({
      where: { id: In(permissionIds) },
    });
  };

  getPermission = async (permissionIds: string): Promise<Permission> => {
    if (permissionIds.length === 0) {
      return null;
    }

    return await this.permissionsRepository.findOne({
      where: { id: permissionIds },
    });
  };
}
