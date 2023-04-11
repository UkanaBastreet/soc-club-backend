import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { RegistrationDto } from './dto/registetraion.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/login')
  login(@Body() dto: CreateUserDto) {
    return this.authService.login(dto);
  }
  @Post('/registration')
  registration(@Body() dto: RegistrationDto) {
    return this.authService.registration(dto);
  }
}
