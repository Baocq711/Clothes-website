import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from '@/modules/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '@/modules/role/entities/role.entity';
import { Contact } from '@/modules/contact/entities/contact.entity';
import { Review } from '@/modules/review/entities/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Contact, Review])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
