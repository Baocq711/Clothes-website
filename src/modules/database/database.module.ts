import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from '@/modules/permission/entities/permission.entity';
import { Role } from '@/modules/role/entities/role.entity';
import { User } from '@/modules/user/entities/user.entity';
import { UserModule } from '@/modules/user/user.module';
import { DatabaseController } from '@/modules/database/database.controller';
import { DatabaseService } from '@/modules/database/database.service';

@Module({
  imports: [TypeOrmModule.forFeature([Permission, Role, User]), UserModule],
  controllers: [DatabaseController],
  providers: [DatabaseService],
})
export class DatabaseModule {}
