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

  @Column({ nullable: true })
  price: number;

  @Column({ nullable: true })
  color: string;

  @Column({ nullable: true })
  size: string;

  @Column({ nullable: true })
  quantity: number;

  @ManyToOne(() => Product, (product) => product.productDetails)
  product: Relation<Product>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
