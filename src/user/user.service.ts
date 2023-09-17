import { ConfigService } from '@nestjs/config';
import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserNotFoundException } from '@common/exceptions/customs/auth.exception';
import axios from 'axios';

@Injectable()
export class UserService {}
