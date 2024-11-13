import {
  NotFoundException,
  Injectable,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@/modules/user/entities/user.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { Role } from '@/modules/role/entities/role.entity';
import { PaginationDto } from '@/dto/pagination';
import { USER_ROLE } from '@/modules/database/sample';
import { Contact } from '@/modules/contact/entities/contact.entity';
import { Review } from '@/modules/review/entities/review.entity';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  create = async (createUserDto: CreateUserDto) => {
    if (await this.userRepository.findOneBy({ email: createUserDto.email })) {
      throw new Error('Người dùng đã tồn tại');
    }

    createUserDto.password = this.hashPassword(createUserDto.password);

    const role = createUserDto.roleId
      ? await this.roleRepository.findOneBy({
          id: createUserDto.roleId,
        })
      : await this.roleRepository.findOneBy({
          name: USER_ROLE,
        });

    if (createUserDto.roleId && !role) {
      throw new NotFoundException('Role không tồn tại');
    }

    const contacts = await this.contactRepository.find({
      where: { id: In(createUserDto.contactIds) },
    });
    if (
      createUserDto.contactIds &&
      contacts.length !== createUserDto.contactIds.length
    ) {
      throw new NotFoundException('Một hoặc nhiều contact không tồn tại');
    }
    const reviews = await this.reviewRepository.find({
      where: { id: In(createUserDto.reviewIds) },
    });
    if (
      createUserDto.reviewIds &&
      contacts.length !== createUserDto.reviewIds.length
    ) {
      throw new NotFoundException('Một hoặc nhiều review không tồn tại');
    }

    const user = this.userRepository.create({
      ...createUserDto,
      role,
      contacts,
      reviews,
    });

    const record = await this.userRepository.save(user);

    return {
      id: record.id,
      createdAt: record.createdAt,
    };
  };

  findAll = async ({ limit, page }: PaginationDto) => {
    const [data, totalRecords] = await this.userRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['role', 'contacts', 'reviews', 'reviews.product'],
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
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['contacts', 'role', 'reviews', 'reviews.product'],
    });
    if (!user) {
      throw new NotFoundException('Người dùng không tồn tại');
    }
    return user;
  };

  update = async (id: string, updateUserDto: UpdateUserDto) => {
    const userUpdate = await this.userRepository.findOneBy({ id });
    if (!userUpdate) {
      throw new NotFoundException('Người dùng không tồn tại');
    }

    const userRole = await this.cacheManager.get<Role>('userRole');

    const role = updateUserDto.roleId
      ? await this.roleRepository.findOneBy({
          id: updateUserDto.roleId,
        })
      : userRole
        ? userRole
        : await this.roleRepository
            .findOneBy({
              name: USER_ROLE,
            })
            .then((role) => {
              this.cacheManager.set('userRole', role);
              return role;
            });

    if (updateUserDto.roleId && !role) {
      throw new NotFoundException('Role không tồn tại');
    }

    const contacts = await this.contactRepository.find({
      where: { id: In(updateUserDto.contactIds) },
    });
    if (
      updateUserDto.contactIds &&
      contacts.length !== updateUserDto.contactIds.length
    ) {
      throw new NotFoundException('Một hoặc nhiều contact không tồn tại');
    }
    const reviews = await this.reviewRepository.find({
      where: { id: In(updateUserDto.reviewIds) },
    });
    if (
      updateUserDto.reviewIds &&
      contacts.length !== updateUserDto.reviewIds.length
    ) {
      throw new NotFoundException('Một hoặc nhiều review không tồn tại');
    }
    const user = this.userRepository.create({
      ...updateUserDto,
      contacts,
      reviews,
      role,
    });
    await this.userRepository.update(id, user);
    return {
      id: userUpdate.id,
      updatedAt: userUpdate.updatedAt,
    };
  };

  remove = async (id: string) => {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['contacts', 'reviews', 'role'],
    });
    if (!user) {
      throw new NotFoundException('Người dùng không tồn tại');
    }

    const record = await this.userRepository.softRemove(user);
    return {
      id: record.id,
      deletedAt: record.deletedAt,
    };
  };

  recover = async (id: string) => {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['contacts', 'reviews', 'role'],
      withDeleted: true,
    });
    if (!user) {
      throw new NotFoundException('Người dùng không tồn tại');
    }
    if (user.deletedAt === null) {
      throw new BadRequestException('Người dùng không bị xóa');
    }

    const record = await this.userRepository.recover(user);
    return {
      id: record.id,
      recover: Date.now(),
    };
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
