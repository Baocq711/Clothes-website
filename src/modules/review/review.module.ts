import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from '@/modules/review/entities/review.entity';
import { User } from '@/modules/user/entities/user.entity';
import { Product } from '@/modules/product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, User, Product])],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
