import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '@/modules/role/entities/role.entity';
import { Permission } from '@/modules/permission/entities/permission.entity';
import { PermissionService } from '@/modules/permission/permission.service';
import { PermissionController } from '@/modules/permission/permission.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission])],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {}
