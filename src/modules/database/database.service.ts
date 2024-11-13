import {
  ADMIN_ROLE,
  INIT_PERMISSIONS,
  USER_ROLE,
} from '@/modules/database/sample';
import { Permission } from '@/modules/permission/entities/permission.entity';
import { Role } from '@/modules/role/entities/role.entity';
import { User } from '@/modules/user/entities/user.entity';
import { UserService } from '@/modules/user/user.service';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private userService: UserService,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}
  private readonly logger = new Logger('InitSampleData');

  onModuleInit = async () => {
    if (process.env.SHOULD_INIT !== 'true') {
      return;
    }

    if ((await this.permissionRepository.count()) === 0) {
      this.logger.log('Init permissions');
      await this.permissionRepository.save(INIT_PERMISSIONS);
    }

    if ((await this.roleRepository.count()) === 0) {
      this.logger.log('Init roles');
      const permissions = await this.permissionRepository.find();
      await this.roleRepository.save([
        {
          name: ADMIN_ROLE,
          description: 'Admin thì full quyền :v',
          isActived: true,
          permissions: permissions,
        },
        {
          name: USER_ROLE,
          description: 'Người dùng sử dụng hệ thống',
          isActived: true,
          permissions: [], //không set quyền, chỉ cần add ROLE
        },
      ]);
    }

    if ((await this.userRepository.count({ relations: ['contacts'] })) === 0) {
      this.logger.log('Init users');
      const adminRole = await this.roleRepository.findOneBy({
        name: ADMIN_ROLE,
      });
      const userRole = await this.roleRepository.findOneBy({
        name: USER_ROLE,
      });
      await this.cacheManager.set('userRole', userRole, 0);
      this.userRepository.save([
        {
          email: 'admin@gmail.com',
          password: this.userService.hashPassword(process.env.INIT_PASSWORD),
          age: 18,
          gender: 'male',
          role: adminRole,
          name: 'BAO',
          contacts: [
            {
              name: 'ADMIN',
              phone: '12345',
              address: '75 Vinh Hoi',
            },
            {
              name: 'USER',
              phone: '123456',
              address: '99 Phuoc Thien',
            },
          ],
        },
        {
          email: 'cqb@gmail.com',
          password: this.userService.hashPassword(process.env.INIT_PASSWORD),
          age: 18,
          gender: 'male',
          role: adminRole,
          name: 'CHAU QUOC BAO',
          contacts: [
            {
              name: 'ADMIN',
              phone: '12345',
              address: '75 Vinh Hoi',
            },
            {
              name: 'USER',
              phone: '123456',
              address: '99 Phuoc Thien',
            },
          ],
        },
        {
          email: 'user@gmail.com',
          password: this.userService.hashPassword(process.env.INIT_PASSWORD),
          age: 18,
          gender: 'male',
          role: userRole,
          name: 'CQB',
          contacts: [
            {
              name: 'ADMIN',
              phone: '12345',
              address: '75 Vinh Hoi',
            },
            {
              name: 'USER',
              phone: '123456',
              address: '99 Phuoc Thien',
            },
          ],
        },
      ]);
    }
  };
}
