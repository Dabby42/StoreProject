import {
  ConflictException,
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEnum, User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CacheService } from '../cache/cache.service';
import { ObjectId } from "mongodb";

@Injectable()
export class UserService {
  private readonly logger = new Logger('UserService');
  private readonly userCacheKeyBase: string;
  private readonly adminCacheKeyBase: string;
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private cacheService: CacheService,
  ) {
    this.userCacheKeyBase = 'USER_';
    this.adminCacheKeyBase = 'ADMIN_';
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOneBy({
      email: createUserDto.email,
      username: createUserDto.username,
      phone_number: createUserDto.phone_number,
    });

    if (user) {
      if (createUserDto.username === user.username)
        throw new ConflictException('A user with this username already exist');
      else if (createUserDto.email === user.email)
        throw new ConflictException('A user with this email already exist');
      else
        throw new ConflictException(
          'A user with this phone number already exist',
        );
    }

    const newUser = this.userRepository.create(createUserDto);
    newUser.password = await User.hashPassword(createUserDto.password);

    try {
      await this.userRepository.save(newUser);
    } catch (err) {
      this.logger.error(err);
      throw new UnprocessableEntityException('An unknown error occurred');
    }
  }
  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.username) {
      const user = await this.userRepository.findOne({
        where: { username: updateUserDto.username },
      });
      if (user) throw new ConflictException('Username already in use.');
    }
    await this.userRepository.update(id, updateUserDto);
    this.cacheService.refresh(this.userCacheKeyBase + id);
  }
  async findByUsername(username: string) {
    return await this.userRepository.findOne({ where: { username } });
  }

  async loadUser(_id: ObjectId, role: RoleEnum) {
    let key =
      role === RoleEnum.USER ? this.userCacheKeyBase : this.adminCacheKeyBase;
    key += _id;
    return this.cacheService.cachedData(key, async () => {
      let user;
      const objectId = new ObjectId(_id);

      if (role === RoleEnum.USER) {
        user = await this.userRepository.findOne({ where: { _id: objectId } });
      } else {
        // fetch from admin table
      }
      if (!user) return null;
      delete user.password;
      return user;
    });
  }
}
