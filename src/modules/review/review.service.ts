import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/modules/user/entities/user.entity';
import { Product } from '@/modules/product/entities/product.entity';
import { PaginationDto } from '@/dto/pagination';
import { CreateReviewDto } from '@/modules/review/dto/create-review.dto';
import { Review } from '@/modules/review/entities/review.entity';
import { UpdateReviewDto } from '@/modules/review/dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  create = async (createReviewDto: CreateReviewDto) => {
    const user = await this.userRepository.findOneBy({
      id: createReviewDto.userId,
    });
    if (createReviewDto.userId && !user) {
      throw new NotFoundException('User không tồn tại');
    }

    const product = await this.productRepository.findOneBy({
      id: createReviewDto.productId,
    });
    if (createReviewDto.productId && !product) {
      throw new NotFoundException('Product không tồn tại');
    }

    const review = this.reviewRepository.create({
      ...createReviewDto,
      user,
      product,
    });
    const record = await this.reviewRepository.save(review);
    return {
      id: record.id,
      createdAt: record.createdAt,
    };
  };

  findAll = async ({ limit, page }: PaginationDto) => {
    const [data, totalRecords] = await this.reviewRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['user', 'product'],
    });

    const totalPages = Math.ceil(totalRecords / limit);

    return {
      pagination: {
        page,
        limit,
        totalRecords,
        totalPages,
      },
      data,
    };
  };

  findOne = async (id: string) => {
    const review = await this.reviewRepository.findOne({
      where: { id },
      relations: ['user', 'product'],
    });
    if (!review) {
      throw new NotFoundException('Review không tồn tại');
    }
    return review;
  };

  update = async (id: string, updateReviewDto: UpdateReviewDto) => {
    const reviewUpdate = await this.reviewRepository.findOne({
      where: { id },
      relations: ['user', 'product'],
    });
    if (!reviewUpdate) {
      throw new NotFoundException('Review không tồn tại');
    }

    const user = await this.userRepository.findOneBy({
      id: updateReviewDto.userId,
    });
    if (updateReviewDto.userId && !user) {
      throw new NotFoundException('User không tồn tại');
    }

    const product = await this.productRepository.findOneBy({
      id: updateReviewDto.productId,
    });
    if (updateReviewDto.productId && !product) {
      throw new NotFoundException('Product không tồn tại');
    }

    const review = this.reviewRepository.create({
      ...updateReviewDto,
      user,
      product,
    });
    await this.reviewRepository.update(id, review);
    return {
      id: reviewUpdate.id,
      updatedAt: reviewUpdate.updatedAt,
    };
  };

  remove = async (id: string) => {
    const review = await this.reviewRepository.findOne({
      where: { id },
      relations: ['user', 'product'],
    });
    if (!review) {
      throw new NotFoundException('Review không tồn tại');
    }

    const record = await this.reviewRepository.softRemove(review);
    return {
      id: record.id,
      deletedAt: record.deletedAt,
    };
  };
}
