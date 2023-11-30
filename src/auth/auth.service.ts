import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEnum, User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { sendSuccess } from '../utils/helpers/response.helpers';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import * as crypto from 'crypto';
import { ConfirmResetPasswordTokenDto } from './dto/confirm-reset-password-token.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CacheService } from '../cache/cache.service';
import { ObjectId } from 'mongodb';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    private cacheService: CacheService,
  ) {}

  async loginUser(loginUserDto: LoginUserDto, adminLogin = false) {
    const user = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isMatch = await User.comparePasswords(
      loginUserDto.password,
      user.password,
    );

    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    //For the web token
    const payload = {
      id: user._id,
      email: user.email,
      role: adminLogin ? RoleEnum.ADMIN : RoleEnum.USER,
    };
    const token = this.jwtService.sign(payload);

    delete user.password;

    return sendSuccess({ token, user }, 'Login Success');
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      const token = crypto.randomBytes(20).toString('hex');

      this.cacheService.set(token, existingUser._id, 60 * 10);

      try {
        // send notification link
      } catch (e) {
        this.logger.log(e);
      }
      return true;
    } else {
      throw new BadRequestException('User with account does not exist');
    }
  }

  async confirmResetPasswordToken(
    confirmResetPasswordTokenDto: ConfirmResetPasswordTokenDto,
  ) {
    const { token } = confirmResetPasswordTokenDto;

    const value = await this.cacheService.get(token);

    if (!value) {
      throw new BadRequestException('Token is not valid');
    }

    return true;
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { newPassword, token } = resetPasswordDto;

    const userId = await this.cacheService.get(token);

    if (!userId) {
      throw new BadRequestException('Token is not valid');
    }

    const objectId = new ObjectId(userId);

    const user = await this.userRepository.findOneBy({_id:objectId});

    const isMatch = await User.comparePasswords(newPassword, user.password);

    if (isMatch) {
      throw new ConflictException('Password used before');
    }

    user.password = await User.hashPassword(newPassword);

    await this.userRepository.save(user);

    await this.cacheService.delete(token);

    return user;
  }

  async changePassword(user, changePasswordDto: ChangePasswordDto) {
    const objectId = new ObjectId(user._id);
    const foundUser = await this.userRepository.findOne({
      where: { _id: objectId },
    });
    const isMatch = await User.comparePasswords(
      changePasswordDto.oldPassword,
      foundUser.password,
    );

    if (!isMatch) {
      throw new BadRequestException('Invalid password');
    }

    foundUser.password = await User.hashPassword(changePasswordDto.newPassword);
    await this.userRepository.save(foundUser);

    return foundUser;
  }
}
