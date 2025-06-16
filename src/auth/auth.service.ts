import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register(createUserDto: CreateUserDto) {
    const userExists = await this.usersService.findByEmail(createUserDto.email);
    if (userExists) {
      throw new ConflictException('Email already registered');
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;
    return this.usersService.create(createUserDto);
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.usersService.findByEmail(loginUserDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const passwordMatches = await bcrypt.compare(loginUserDto.password, user.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // Aquí puedes generar token JWT y devolverlo
    return { message: 'Login success', user };
  }
}
