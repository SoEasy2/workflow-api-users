import { Controller } from '@nestjs/common';
import {
  EventPattern,
  MessagePattern,
  Payload,
  RpcException,
} from '@nestjs/microservices';
import { IKafkaMessage } from '../common/interfaces/kafka-message.interface';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { AppLogger } from '../shared/logger/logger.service';
import { PermissionsService } from './permissions.service';
import {
  TOPIC_PERMISSIONS_CREATE,
  TOPIC_PERMISSIONS_CREATE_REPLY,
  TOPIC_PERMISSIONS_UPDATE,
  TOPIC_PERMISSIONS_UPDATE_REPLY,
  TOPIC_USER_CREATE,
  TOPIC_USER_CREATE_REPLY,
} from '../common/constants';
import { Permission } from './entities/permission.entity';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Controller('permissions')
export class PermissionsController {
  constructor(
    private readonly permissionsService: PermissionsService,
    private readonly appLogger: AppLogger,
  ) {
    this.appLogger.setContext(PermissionsController.name);
  }

  @MessagePattern(TOPIC_PERMISSIONS_CREATE)
  async create(
    @Payload() message: IKafkaMessage<CreatePermissionDto>,
  ): Promise<Permission> {
    try {
      this.appLogger.log(
        `[PermissionsController][${TOPIC_PERMISSIONS_CREATE}] -> [create]`,
      );
      return await this.permissionsService.create(message.value);
    } catch (err) {
      this.appLogger.error(
        err,
        err.stack,
        `[PermissionsController][${TOPIC_PERMISSIONS_CREATE}] -> [create]`,
      );
      throw new RpcException(JSON.stringify(err));
    }
  }
  @EventPattern(TOPIC_PERMISSIONS_CREATE_REPLY)
  async logCreate(): Promise<void> {
    this.appLogger.log(
      `[PermissionsController][${TOPIC_PERMISSIONS_CREATE}][SEND] -> [create]`,
    );
  }

  @MessagePattern(TOPIC_PERMISSIONS_UPDATE)
  async update(
    @Payload() message: IKafkaMessage<UpdatePermissionDto>,
  ): Promise<Permission> {
    try {
      this.appLogger.log(
        `[PermissionsController][${TOPIC_PERMISSIONS_UPDATE}] -> [update]`,
      );
      return await this.permissionsService.update(message.value);
    } catch (err) {
      this.appLogger.error(
        err,
        err.stack,
        `[PermissionsController][${TOPIC_PERMISSIONS_UPDATE}] -> [update]`,
      );
      throw new RpcException(JSON.stringify(err));
    }
  }
  @EventPattern(TOPIC_PERMISSIONS_UPDATE_REPLY)
  async logUpdate(): Promise<void> {
    this.appLogger.log(
      `[PermissionsController][${TOPIC_PERMISSIONS_UPDATE}][SEND] -> [create]`,
    );
  }
}
