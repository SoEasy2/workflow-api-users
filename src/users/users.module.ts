import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { AppLogger } from '../shared/logger/logger.service';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UsersService, AppLogger],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
