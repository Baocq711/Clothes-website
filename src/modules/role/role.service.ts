import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '@/modules/role/entities/role.entity';
import { In, Repository } from 'typeorm';
import { Permission } from '@/modules/permission/entities/permission.entity';
import { PaginationDto } from '@/dto/pagination';
import { isNotEmptyObject } from 'class-validator';
import { User } from '@/modules/user/entities/user.entity';
@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create = async (createRoleDto: CreateRoleDto) => {
    if (await this.rolesRepository.findOneBy({ name: createRoleDto.name })) {
      throw new BadRequestException('Role đã tồn tại');
    }

    const permissions = await this.permissionsRepository.find({
      where: { id: In(createRoleDto.permissionIds) },
    });
    if (
      createRoleDto.permissionIds &&
      permissions.length !== createRoleDto.permissionIds.length
    ) {
      throw new NotFoundException('Một hoặc nhiều permission không tồn tại');
    }
    const users = await this.usersRepository.find({
      where: { id: In(createRoleDto.userIds) },
    });
    if (
      createRoleDto.userIds &&
      users.length !== createRoleDto.userIds.length
    ) {
      throw new NotFoundException('Một hoặc nhiều người dùng không tồn tại');
    }

    const role = this.rolesRepository.create({
      ...createRoleDto,
      permissions,
      users,
    });

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
      relations: ['permissions', 'users'],
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
      relations: ['permissions', 'users'],
    });
    if (!role) {
      throw new BadRequestException('Role không tồn tại');
    }
    return role;
  };

  update = async (id: string, updateRoleDto: UpdateRoleDto) => {
    const roleUpdate = await this.rolesRepository.findOne({
      where: { id },
      relations: ['permissions', 'users'],
    });

    const permissions = await this.permissionsRepository.find({
      where: { id: In(updateRoleDto.permissionIds) },
    });
    if (
      updateRoleDto.permissionIds &&
      permissions.length !== updateRoleDto.permissionIds.length
    ) {
      throw new NotFoundException('Một hoặc nhiều permission không tồn tại');
    }
    const users = await this.usersRepository.find({
      where: { id: In(updateRoleDto.userIds) },
    });
    if (
      updateRoleDto.userIds &&
      users.length !== updateRoleDto.userIds.length
    ) {
      throw new NotFoundException('Một hoặc nhiều người dùng không tồn tại');
    }

    const role = this.rolesRepository.create({
      ...updateRoleDto,
      permissions,
      users,
    });

    await this.rolesRepository.update(id, role);

    return {
      id: roleUpdate.id,
      updatedAt: roleUpdate.updatedAt,
    };
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
