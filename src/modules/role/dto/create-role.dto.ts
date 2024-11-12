import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
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

  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  permissionIds: string[];

  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  userIds: string[];
}
