import { IsDateString, IsNumberString, IsOptional } from 'class-validator';

export class OrderQueryDto {
  @IsOptional()
  @IsNumberString()
  readonly page?: string = '1';

  @IsOptional()
  @IsNumberString()
  readonly limit?: string = '20';

  @IsOptional()
  @IsNumberString()
  user_id?: string;

  @IsDateString()
  @IsOptional()
  readonly start_date?: string;

  @IsDateString()
  @IsOptional()
  readonly end_date?: string;
}
