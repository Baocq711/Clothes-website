import { CreateContactDto } from '@/modules/contact/dto/create-contact.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateContactDto extends PartialType(CreateContactDto) {}
