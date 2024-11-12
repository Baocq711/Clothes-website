import { Contact } from '@/modules/contact/entities/contact.entity';
import { Review } from '@/modules/review/entities/review.entity';
import { Role } from '@/modules/role/entities/role.entity';
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
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  email: string;

  @Column({ select: false, nullable: false })
  password: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  age: number;

  @Column({ nullable: false })
  gender: string;

  @OneToMany(() => Contact, (contact) => contact.user, {
    cascade: true,
  })
  contacts: Relation<Contact[]>;

  @ManyToOne(() => Role, (role) => role.users)
  role: Relation<Role>;

  @Column({ default: false })
  isActive: boolean;

  @Column({ nullable: true })
  refreshToken: string;

  @OneToMany(() => Review, (review) => review.user, {
    cascade: true,
  })
  reviews: Relation<Review[]>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
