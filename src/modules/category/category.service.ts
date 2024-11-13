import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '@/modules/category/entities/category.entity';
import { In, Repository } from 'typeorm';
import { Product } from '@/modules/product/entities/product.entity';
import { PaginationDto } from '@/dto/pagination';
import { CreateCategoryDto } from '@/modules/category/dto/create-category.dto';
import { UpdateCategoryDto } from '@/modules/category/dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  create = async (createCategoryDto: CreateCategoryDto) => {
    if (
      await this.categoriesRepository.findOneBy({
        name: createCategoryDto.name,
      })
    ) {
      throw new BadRequestException('Category đã tồn tại');
    }

    const parent = await this.categoriesRepository.findOneBy({
      id: createCategoryDto.parentId,
    });
    if (createCategoryDto.parentId && !parent) {
      throw new NotFoundException('Parent category không tồn tại');
    }

    const children = await this.categoriesRepository.find({
      where: { id: In(createCategoryDto.childrenIds) },
    });
    if (
      createCategoryDto.childrenIds &&
      children.length !== createCategoryDto?.childrenIds.length
    ) {
      throw new NotFoundException(
        'Một hoặc nhiều children category không tồn tại',
      );
    }

    const products = await this.productsRepository.find({
      where: { id: In(createCategoryDto.productIds) },
    });

    if (
      createCategoryDto.productIds &&
      products.length !== createCategoryDto?.productIds.length
    ) {
      throw new NotFoundException('Một hoặc nhiều product không tồn tại');
    }

    const category = this.categoriesRepository.create({
      name: createCategoryDto.name,
      parent,
      children,
      products,
    });

    const record = await this.categoriesRepository.save(category);
    return {
      id: record.id,
      createdAt: record.createdAt,
    };
  };

  findAll = async ({ limit, page }: PaginationDto) => {
    const [data, totalRecords] = await this.categoriesRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['parent', 'children', 'products'],
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
    const category = await this.categoriesRepository.findOne({
      where: { id },
      relations: ['parent', 'children', 'products'],
    });
    if (!category) {
      throw new NotFoundException('Category không tồn tại');
    }
    return category;
  };

  update = async (id: string, updateCategoryDto: UpdateCategoryDto) => {
    const categoryUpdate = await this.categoriesRepository.findOneBy({ id });
    if (!categoryUpdate) {
      throw new NotFoundException('Category không tồn tại');
    }

    const parent = await this.categoriesRepository.findOneBy({
      id: updateCategoryDto?.parentId,
    });
    if (updateCategoryDto.parentId && !parent) {
      throw new NotFoundException('Parent category không tồn tại');
    }
    const children = await this.categoriesRepository.find({
      where: { id: In(updateCategoryDto?.childrenIds) },
    });
    if (
      updateCategoryDto.childrenIds &&
      children.length !== updateCategoryDto?.childrenIds.length
    ) {
      throw new NotFoundException(
        'Một hoặc nhiều children category không tồn tại',
      );
    }

    const products = await this.productsRepository.find({
      where: { id: In(updateCategoryDto?.productIds) },
    });

    if (
      updateCategoryDto.productIds &&
      products.length !== updateCategoryDto?.productIds.length
    ) {
      throw new NotFoundException('Một hoặc nhiều product không tồn tại');
    }

    const category = this.categoriesRepository.create({
      ...updateCategoryDto,
      parent,
      children,
      products,
    });
    await this.categoriesRepository.update(id, category);
    return {
      id: categoryUpdate.id,
      updatedAt: categoryUpdate.updatedAt,
    };
  };

  remove = async (id: string) => {
    const category = await this.categoriesRepository.findOne({
      where: { id },
      relations: ['parent', 'children', 'products'],
    });
    if (!category) {
      throw new NotFoundException('Category không tồn tại');
    }

    const record = await this.categoriesRepository.softRemove(category);
    return {
      id: record.id,
      deletedAt: record.deletedAt,
    };
  };
}
