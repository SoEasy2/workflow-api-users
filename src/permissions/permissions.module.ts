import { Module } from '@nestjs/common';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Permission } from './entities/permission.entity';
import { AppLogger } from '../shared/logger/logger.service';

@Module({
  imports: [SequelizeModule.forFeature([Permission])],
  controllers: [PermissionsController],
  providers: [PermissionsService, AppLogger],
})
export class PermissionsModule {}
