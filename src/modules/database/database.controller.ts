import { DatabaseService } from '@/modules/database/database.service';
import { Controller } from '@nestjs/common';

@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}
}
