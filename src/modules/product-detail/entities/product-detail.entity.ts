import { Product } from '@/modules/product/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ProductDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  color: string;

  @Column({ nullable: false })
  size: string;

  @Column({ nullable: false })
  quantity: number;

  @Column('simple-array', { nullable: false })
  images: string[];

  @ManyToOne(() => Product, (product) => product.productDetails)
  product: Relation<Product>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
