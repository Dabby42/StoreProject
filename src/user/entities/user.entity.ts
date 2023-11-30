import { Entity, Column, ObjectIdColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { config } from '../../config/config';
import { ObjectId } from 'mongodb';

export enum RoleEnum {
  USER = 1,
  ADMIN = 2,
}

@Entity()
export class User {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  username: string;

  @Column()
  address: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column({ unique: true })
  phone_number: string;

  @Column({ unique: true })
  store_name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public created_at: Date;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.USER,
  })
  role: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  public updated_at: Date;

  static async comparePasswords(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  static async hashPassword(password) {
    const salt = await bcrypt.genSalt(config.salt);
    return await bcrypt.hash(password, salt);
  }
}
