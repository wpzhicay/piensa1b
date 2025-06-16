import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity'; // lo crearemos después
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'adara2014',
      database: 'micro_db',
      entities: [User],
      synchronize: true,  // para desarrollo, en producción mejor false
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
