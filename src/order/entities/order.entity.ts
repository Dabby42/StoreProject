import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { ObjectId } from 'mongodb';

@Entity()
export class Order {
  @ObjectIdColumn()
  public _id: ObjectId;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  public user_id: string;

  @Column()
  public product_id: string;

  @Column()
  public order_id: string;

  @Column()
  public category_id: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  public total_amount: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
