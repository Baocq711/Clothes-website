import { CreateContactDto } from '@/modules/contact/dto/create-contact.dto';
import { UpdateContactDto } from '@/modules/contact/dto/update-contact.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ContactService {
  create(createContactDto: CreateContactDto) {
    return 'This action adds a new contact';
  }

  findAll() {
    return `This action returns all contact`;
  }

  findOne(id: string) {
    return `This action returns a #${id} contact`;
  }

  update(id: string, updateContactDto: UpdateContactDto) {
    return `This action updates a #${id} contact`;
  }

  remove(id: string) {
    return `This action removes a #${id} contact`;
  }
}
