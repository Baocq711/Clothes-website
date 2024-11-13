import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DatabaseController } from './database.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from '@/modules/permission/entities/permission.entity';
import { Role } from '@/modules/role/entities/role.entity';
import { User } from '@/modules/user/entities/user.entity';
import { UserModule } from '@/modules/user/user.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    TypeOrmModule.forFeature([Permission, Role, User]),
    UserModule,
    CacheModule.register(),
  ],
  controllers: [DatabaseController],
  providers: [DatabaseService],
})
export class DatabaseModule {}
