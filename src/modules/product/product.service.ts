import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '@/modules/product/entities/product.entity';
import { In, Repository } from 'typeorm';
import { ProductDetail } from '@/modules/product-detail/entities/product-detail.entity';
import { Category } from '@/modules/category/entities/category.entity';
import { Review } from '@/modules/review/entities/review.entity';
import { PaginationDto } from '@/dto/pagination';
import { CreateProductDto } from '@/modules/product/dto/create-product.dto';
import { UpdateProductDto } from '@/modules/product/dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductDetail)
    private readonly productDetailProductDetailRepository: Repository<ProductDetail>,
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  create = async (createProductDto: CreateProductDto) => {
    if (
      await this.productRepository.findOneBy({ name: createProductDto.name })
    ) {
      throw new BadRequestException('Sản phẩm đã tồn tại');
    }

    const category = await this.categoriesRepository.findOneBy({
      id: createProductDto.categoryId,
    });
    if (createProductDto.categoryId && !category) {
      throw new NotFoundException('Category không tồn tại');
    }

    const productDetails = await this.productDetailProductDetailRepository.find(
      {
        where: { id: In(createProductDto.productDetailIds) },
      },
    );
    if (
      createProductDto.productDetailIds &&
      productDetails.length !== createProductDto.productDetailIds.length
    ) {
      throw new NotFoundException(
        'Một hoặc nhiều product detail không tồn tại',
      );
    }

    const product = this.productRepository.create({
      ...createProductDto,
      category,
      productDetails,
    });
    const record = await this.productRepository.save(product);
    return {
      id: record.id,
      createdAt: record.createdAt,
    };
  };

  findAll = async ({ limit, page }: PaginationDto) => {
    const [data, totalRecords] = await this.productRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['category', 'productDetails', 'reviews', 'reviews.user'],
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
    const category = await this.productRepository.findOne({
      where: { id },
      relations: ['category', 'productDetails', 'reviews', 'reviews.user'],
    });
    if (!category) {
      throw new NotFoundException('Category không tồn tại');
    }
    return category;
  };

  update = async (id: string, updateProductDto: UpdateProductDto) => {
    const productUpdate = await this.productRepository.findOne({
      where: { id },
      relations: ['category', 'productDetails', 'reviews'],
    });
    if (!productUpdate) {
      throw new NotFoundException('Category không tồn tại');
    }

    const category = await this.categoriesRepository.findOneBy({
      id: updateProductDto.categoryId,
    });
    if (updateProductDto.categoryId && !category) {
      throw new NotFoundException('Category không tồn tại');
    }

    const productDetails = await this.productDetailProductDetailRepository.find(
      {
        where: { id: In(updateProductDto?.productDetailIds || []) },
      },
    );
    if (
      updateProductDto.productDetailIds &&
      productDetails.length !== updateProductDto?.productDetailIds.length
    ) {
      throw new NotFoundException(
        'Một hoặc nhiều product detail không tồn tại',
      );
    }

    const product = this.productRepository.create({
      ...updateProductDto,
      category,
      productDetails,
    });
    await this.productRepository.update(id, product);
    return {
      id: productUpdate.id,
      updatedAt: productUpdate.updatedAt,
    };
  };

  remove = async (id: string) => {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['parent', 'children', 'products'],
    });
    if (!product) {
      throw new NotFoundException('Category không tồn tại');
    }

    const record = await this.productRepository.softRemove(product);
    return {
      id: record.id,
      deletedAt: record.deletedAt,
    };
  };
}
