import { Category } from '@/modules/category/entities/category.entity';
import { ProductDetail } from '@/modules/product-detail/entities/product-detail.entity';
import { Review } from '@/modules/review/entities/review.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  decription: string;

  @OneToMany(() => Review, (review) => review.product, { nullable: true })
  reviews: Relation<Review[]>;

  @ManyToOne(() => Category, (category) => category.products)
  category: Relation<Category>;

  @OneToMany(() => ProductDetail, (productDetail) => productDetail.product)
  productDetails: Relation<ProductDetail[]>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
