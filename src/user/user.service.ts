import { ConfigService } from '@nestjs/config';
import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Logger } from 'src/lib/winston/winston.service';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    await new Promise(resolve => setTimeout(resolve, 5000));
    throw new BadRequestException('테스트입니다.');
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
