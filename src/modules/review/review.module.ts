import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from '@/modules/review/entities/review.entity';
import { User } from '@/modules/user/entities/user.entity';
import { Product } from '@/modules/product/entities/product.entity';
import { ReviewController } from '@/modules/review/review.controller';
import { ReviewService } from '@/modules/review/review.service';

@Module({
  imports: [TypeOrmModule.forFeature([Review, User, Product])],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
