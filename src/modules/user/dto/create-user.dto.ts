import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  MinLength,
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
