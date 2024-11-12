import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateContactDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  address: string;

  @IsOptional()
  @IsUUID()
  userId: string;
}
