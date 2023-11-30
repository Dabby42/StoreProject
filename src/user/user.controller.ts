import { Body, Controller, Put, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from '../auth/auth.jwt.guard';
import { sendSuccess } from '../utils/helpers/response.helpers';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('jwt')
@ApiTags('User')
@Controller('v1/user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Put()
  async updateUser(@Body() updateUserDto: UpdateUserDto, @Request() req) {
    await this.userService.updateUser(req.user.id, updateUserDto);
    return sendSuccess(null, 'Profile updated.');
  }
}
