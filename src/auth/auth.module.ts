import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../config/config';
import { User } from '../user/entities/user.entity';
import { CustomCacheModule } from '../cache/cache.module';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth.jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CustomCacheModule,
    UserModule,
    JwtModule.register({
      secret: config.jwt.secret,
      signOptions: { expiresIn: config.jwt.expiry },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
