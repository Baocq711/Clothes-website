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
import { User } from '@/modules/user/entities/user.entity';
@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create = async (createRoleDto: CreateRoleDto) => {
    if (await this.roleRepository.findOneBy({ name: createRoleDto.name })) {
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

    const role = this.roleRepository.create({
      ...createRoleDto,
      permissions,
      users,
    });

    const record = await this.roleRepository.save(role);

    return {
      id: record.id,
      createdAt: record.createdAt,
    };
  };

  findAll = async ({ page, limit }: PaginationDto) => {
    const [data, totalRecords] = await this.roleRepository.findAndCount({
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
    const role = await this.roleRepository.findOne({
      where: { id },
      relations: ['permissions', 'users'],
    });
    if (!role) {
      throw new NotFoundException('Role không tồn tại');
    }
    return role;
  };

  update = async (id: string, updateRoleDto: UpdateRoleDto) => {
    const roleUpdate = await this.roleRepository.findOne({
      where: { id },
      relations: ['permissions', 'users'],
    });

    if (!roleUpdate) {
      throw new NotFoundException('Role không tồn tại');
    }

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

    const role = this.roleRepository.create({
      ...updateRoleDto,
      permissions,
      users,
    });

    await this.roleRepository.update(id, role);

    return {
      id: roleUpdate.id,
      updatedAt: roleUpdate.updatedAt,
    };
  };

  remove = async (id: string) => {
    const role = await this.roleRepository.findOne({
      where: { id },
      relations: ['permissions', 'users'],
    });

    if (!role) {
      throw new NotFoundException('Role không tồn tại');
    }

    const record = await this.roleRepository.softRemove(role);
    return {
      id: record.id,
      deletedAt: record.deletedAt,
    };
  };
}
