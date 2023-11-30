import { IsAlpha, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  readonly user_id: string;

  @IsNotEmpty()
  readonly product_id: string;

  @IsNotEmpty()
  readonly order_id: string;

  @IsNotEmpty()
  @IsAlpha()
  readonly category_id: string;

  @IsNotEmpty()
  readonly total_amount: number;
}
