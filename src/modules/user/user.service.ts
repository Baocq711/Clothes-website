import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { Role } from '@/modules/role/entities/role.entity';
import { PaginationDto } from '@/dto/pagination';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  create = async (createUserDto: CreateUserDto) => {
    if (await this.userRepository.findOneBy({ email: createUserDto.email })) {
      throw new Error('Người dùng đã tồn tại');
    }

    createUserDto.password = this.hashPassword(createUserDto.password);

    const { roleName, ...createUser } = createUserDto;

    const role = await this.roleRepository.findOneBy({
      name: roleName,
    });

    if (!role) {
      throw new BadRequestException('Role không tồn tại');
    }

    const createdUser = this.userRepository.create({ ...createUser, role });
    const record = await this.userRepository.save(createdUser);

    return {
      id: record.id,
      createdAt: record.createdAt,
    };
  };

  findAll = async ({ limit, page }: PaginationDto) => {
    return this.userRepository.find({
      take: limit,
      skip: (page - 1) * limit,
      relations: ['role', 'contacts'],
    });
  };

  findOne = async (id: string) => {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['contacts'],
      select: {
        contacts: true,
      },
    });
    if (!user) {
      throw new BadRequestException('Người dùng không tồn tại');
    }
    return user;
  };

  update = async (id: string, updateUserDto: UpdateUserDto) => {
    if (!(await this.userRepository.findOneBy({ id }))) {
      throw new BadRequestException('Người dùng không tồn tại');
    }

    const role = await this.roleRepository.findOneBy({
      id: updateUserDto?.roleId,
    });
    if (updateUserDto.roleId && !role) {
      throw new BadRequestException('Role không tồn tại');
    }

    return await this.userRepository.update(id, { ...updateUserDto, role });
  };

  remove = async (id: string) => {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['contacts'],
    });
    if (!user) {
      throw new BadRequestException('Người dùng không tồn tại');
    }

    return await this.userRepository.softRemove(user);
  };

  restore = async (id: string) => {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['contacts'],
      withDeleted: true,
    });
    if (!user) {
      throw new BadRequestException('Người dùng không tồn tại');
    }
    return await this.userRepository.recover(user);
  };

  // HASH PASSWORD
  hashPassword = (password: string) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  };

  comparePassword = (password: string, hash: string) => {
    return bcrypt.compareSync(password, hash);
  };

  //AUTHENTICATION

  findOneByEmail = async (email: string) => {
    return this.userRepository.findOne({
      where: { email },
      relations: ['role'],
      select: {
        id: true,
        password: true,
        role: {
          id: true,
        },
      },
    });
  };

  //REFRESH TOKEN
  findOneByRefreshToken = async (refreshToken: string) => {
    return await this.userRepository.findOneBy({ refreshToken });
  };

  updateRefreshToken = async (id: string, refreshToken: string | null) => {
    return await this.userRepository.update(id, { refreshToken });
  };

  removeRefreshToken = async (id: string) => {
    return await this.userRepository.update(id, { refreshToken: null });
  };
}
