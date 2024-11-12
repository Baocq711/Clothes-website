import { Permission } from '@/modules/permission/entities/permission.entity';
import {
  IsArray,
  IsBoolean,
  IsEmpty,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  description: string;

  @IsBoolean()
  @IsNotEmpty()
  isActived: boolean;

  @IsArray()
  @IsUUID('all', { each: true })
  permissionIds: string[];

  @IsArray()
  @IsUUID('all', { each: true })
  userIds: string[];
}
