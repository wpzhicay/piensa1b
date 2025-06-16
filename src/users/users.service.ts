import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  // 🔹 Agregado: Método register
  async register(createUserDto: CreateUserDto): Promise<User> {
    return this.create(createUserDto);
  }

  // 🔹 Agregado: Método login
  async login(loginUserDto: LoginUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ email: loginUserDto.email });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    if (user.password !== loginUserDto.password) throw new UnauthorizedException('Contraseña incorrecta');
    return user;
  }
}
