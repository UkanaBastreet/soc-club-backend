import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegistrationDto } from './dto/registetraion.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcriptjs from 'bcryptjs';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(dto: CreateUserDto) {
    const user = await this.validateUser(dto);
    return user;
  }
  async registration(dto: RegistrationDto) {
    try {
      const candidate = await this.userService.getUserByEmail(dto.email);
      if (candidate) {
        return new HttpException(
          'User with this email is already existed',
          HttpStatus.BAD_REQUEST,
        );
      }
      const hashPassword: string = await bcriptjs.hash(dto.password, 5);
      const user = await this.userService.create({
        ...dto,
        password: hashPassword,
      });
      return this.generateToken(user);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  private generateToken(user: CreateUserDto) {
    const payload = { email: user.email, name: user.name };
    const token = this.jwtService.sign(payload);
    return {
      token,
    };
  }
  async validateUser(dto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(dto.email);
    if (!user) {
      return new HttpException('User is not found.', HttpStatus.NOT_FOUND);
    }
    const passwordEquals = await bcriptjs.compare(dto.password, user.password);
    if (!user || !passwordEquals) {
      return new UnauthorizedException({
        message: 'Incorrect email or password.',
      });
    }
    const token = this.generateToken(user);
    return token;
  }
}
