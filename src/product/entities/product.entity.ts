import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn, Entity, ObjectIdColumn
} from "typeorm";
import { Category } from '../../category/entities/category.entity';
import { User } from '../../user/entities/user.entity';
import { ObjectId } from "mongodb";
@Entity()
export class Product {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  image_url: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => Category, { nullable: true })
  category_id: number;

  @ManyToOne(() => User, { nullable: true })
  user_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
