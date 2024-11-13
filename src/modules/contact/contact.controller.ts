import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  BadRequestException,
} from '@nestjs/common';
import { ResponseMessage } from '@/decorators/message';
import { ContactService } from '@/modules/contact/contact.service';
import { CreateContactDto } from '@/modules/contact/dto/create-contact.dto';
import { UpdateContactDto } from '@/modules/contact/dto/update-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @ResponseMessage('Tạo liên hệ thành công')
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }

  @Get()
  @ResponseMessage('Lấy danh sách liên hệ thành công')
  findAll() {
    return this.contactService.findAll();
  }

  @Get(':id')
  @ResponseMessage('Lấy thông tin liên hệ thành công')
  findOne(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () => new BadRequestException('Id không hợp lệ'),
      }),
    )
    id: string,
  ) {
    return this.contactService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Cập nhật thông tin liên hệ thành công')
  update(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () => new BadRequestException('Id không hợp lệ'),
      }),
    )
    id: string,
    @Body() updateContactDto: UpdateContactDto,
  ) {
    return this.contactService.update(id, updateContactDto);
  }

  @Delete(':id')
  @ResponseMessage('Xóa liên hệ thành công')
  remove(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () => new BadRequestException('Id không hợp lệ'),
      }),
    )
    id: string,
  ) {
    return this.contactService.remove(id);
  }
}
