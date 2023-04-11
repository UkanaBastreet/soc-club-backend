import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class UsersService {
  constructor(private firebaseService: FirebaseService) {}
  async create(createUserDto: CreateUserDto) {
    const user: User = {
      id: Date.now().toString(),
      ...createUserDto,
    };
    return await this.firebaseService.createUser(user);
  }

  async findAll() {
    return await this.firebaseService.getAllUsers();
  }

  async getUserByEmail(email: string): Promise<User> | undefined {
    return this.firebaseService.getByValue('email', email);
  }
}
