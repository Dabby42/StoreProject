import {
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsAlpha()
  readonly first_name: string;

  @IsNotEmpty()
  @IsAlpha()
  readonly last_name: string;

  @IsNotEmpty()
  readonly password: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly address: string;

  @IsNotEmpty()
  readonly state: string;

  @IsNotEmpty()
  readonly country: string;

  @IsNotEmpty()
  readonly store_name: string;

  @IsPhoneNumber('NG')
  readonly phone_number: string;
}
