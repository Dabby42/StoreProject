

import {
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsAlpha()
  readonly name: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly price: number;

  @IsNotEmpty()
  readonly category_id: number;

  @IsNotEmpty()
  readonly user_id: number;
}
