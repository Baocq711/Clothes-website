import { CreateContactDto } from '@/modules/contact/dto/create-contact.dto';
import { USER_ROLE } from '@/modules/database/sample';
import { CreateRoleDto } from '@/modules/role/dto/create-role.dto';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsEmail,
  IsNotEmpty,
  IsOptional,
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

  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateContactDto)
  contacts: CreateContactDto[];

  @IsOptional()
  roleName?: string = USER_ROLE;
}
