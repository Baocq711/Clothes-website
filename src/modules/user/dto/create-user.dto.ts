import { CreateContactDto } from '@/modules/contact/dto/create-contact.dto';
import { USER_ROLE } from '@/modules/database/sample';
import { CreateRoleDto } from '@/modules/role/dto/create-role.dto';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  gender: string;

  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  contactIds?: string[];

  @IsOptional()
  @IsUUID()
  roleId?: string;

  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  reviewIds?: string[];
}
