import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

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
