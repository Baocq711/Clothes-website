import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '@/modules/role/entities/role.entity';
import { Permission } from '@/modules/permission/entities/permission.entity';
import { User } from '@/modules/user/entities/user.entity';
import { RoleController } from '@/modules/role/role.controller';
import { RoleService } from '@/modules/role/role.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission, User])],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
