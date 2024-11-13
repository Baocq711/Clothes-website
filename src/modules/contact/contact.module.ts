import { ContactController } from '@/modules/contact/contact.controller';
import { ContactService } from '@/modules/contact/contact.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
