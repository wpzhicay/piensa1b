import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';  // <-- Importa el módulo usuarios

@Module({
  imports: [UsersModule],   // <-- Importa aquí
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
