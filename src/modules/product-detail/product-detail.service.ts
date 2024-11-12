import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDetailDto } from './dto/create-product-detail.dto';
import { UpdateProductDetailDto } from './dto/update-product-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '@/modules/product/entities/product.entity';
import { Repository } from 'typeorm';
import { ProductDetail } from '@/modules/product-detail/entities/product-detail.entity';
import { PaginationDto } from '@/dto/pagination';

@Injectable()
export class ProductDetailService {
  constructor(
    @InjectRepository(ProductDetail)
    private readonly productDetailRepository: Repository<ProductDetail>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  create = async (createProductDetailDto: CreateProductDetailDto) => {
    const product = await this.productRepository.findOneBy({
      id: createProductDetailDto.productId,
    });
    if (createProductDetailDto.productId && !product) {
      throw new NotFoundException('Product không tồn tại');
    }

    if (
      await this.productDetailRepository.findOneBy({
        color: createProductDetailDto.color,
        size: createProductDetailDto.size,
        product,
      })
    ) {
      throw new BadRequestException('Product detail đã tồn tại');
    }

    const productDetail = this.productDetailRepository.create({
      ...createProductDetailDto,
      product,
    });

    const record = await this.productDetailRepository.save(productDetail);
    return {
      id: record.id,
      createdAt: record.createdAt,
    };
  };

  findAll = async ({ limit, page }: PaginationDto) => {
    const [data, totalRecords] =
      await this.productDetailRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        relations: ['product'],
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
    const productDetail = await this.productDetailRepository.findOne({
      where: { id },
      relations: ['product'],
    });
    if (!productDetail) {
      throw new NotFoundException('Product detail không tồn tại');
    }
    return productDetail;
  };

  update = async (
    id: string,
    updateProductDetailDto: UpdateProductDetailDto,
  ) => {
    const productDetailUpdate = await this.productDetailRepository.findOne({
      where: { id },
      relations: ['product'],
    });
    if (!productDetailUpdate) {
      throw new NotFoundException('Product detail không tồn tại');
    }

    const product = await this.productRepository.findOneBy({
      id: updateProductDetailDto.productId,
    });
    if (updateProductDetailDto.productId && !product) {
      throw new NotFoundException('Product không tồn tại');
    }

    const productDetail = this.productDetailRepository.create({
      ...updateProductDetailDto,
      product,
    });

    await this.productDetailRepository.update(id, productDetail);
    return {
      id: productDetailUpdate.id,
      updatedAt: productDetailUpdate.updatedAt,
    };
  };

  remove = async (id: string) => {
    const productDetail = await this.productDetailRepository.findOne({
      where: { id },
      relations: ['product'],
    });
    if (!productDetail) {
      throw new NotFoundException('Product detail không tồn tại');
    }
    const record = await this.productDetailRepository.softRemove(productDetail);
    return {
      id: record.id,
      deletedAt: record.deletedAt,
    };
  };
}
