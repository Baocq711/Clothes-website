import { IsArray, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreatePermissionDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  apiPath: string;

  @IsNotEmpty()
  method: string;

  @IsNotEmpty()
  module: string;

  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  roleIds: string[];
}
