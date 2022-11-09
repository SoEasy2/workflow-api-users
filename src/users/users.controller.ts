import { Controller, UseFilters } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import {
  TOPIC_USER_CREATE,
  TOPIC_USER_CREATE_REPLY,
  TOPIC_USER_REMOVE,
  TOPIC_USER_REMOVE_REPLY,
  TOPIC_USER_UPDATE,
  TOPIC_USER_UPDATE_REPLY,
} from '../common/constants';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { ExceptionFilter } from '../exceptions/rpc-exception.filter';
import { IKafkaMessage } from '../common/interfaces/kafka-message.interface';
import { AppLogger } from '../shared/logger/logger.service';
import { UpdateUserInput } from './dto/update-user.input';

@UseFilters(new ExceptionFilter())
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly appLogger: AppLogger,
  ) {
    this.appLogger.setContext(UsersController.name);
  }

  @MessagePattern(TOPIC_USER_CREATE)
  async createUser(
    @Payload() message: IKafkaMessage<CreateUserInput>,
  ): Promise<User> {
    try {
      this.appLogger.log(
        `[UsersController][${TOPIC_USER_CREATE}] -> [createUser]`,
      );
      return await this.usersService.create(message.value);
    } catch (err) {
      this.appLogger.error(
        err,
        err.stack,
        `[UsersController][${TOPIC_USER_CREATE}] -> [createUser]`,
      );
      throw new RpcException(JSON.stringify(err));
    }
  }
  @EventPattern(TOPIC_USER_CREATE_REPLY)
  async logCreateUser(): Promise<void> {
    this.appLogger.log(
      `[UsersController][${TOPIC_USER_CREATE}][SEND] -> [createUser]`,
    );
  }

  @MessagePattern(TOPIC_USER_UPDATE)
  async updateUser(
    @Payload() message: IKafkaMessage<UpdateUserInput>,
  ): Promise<User> {
    try {
      this.appLogger.log(
        `[UsersController][${TOPIC_USER_UPDATE}] -> [updateUser]`,
      );
      return await this.usersService.update(message.value);
    } catch (err) {
      this.appLogger.error(
        err,
        err.stack,
        `[UsersController][${TOPIC_USER_UPDATE}] -> [updateUser]`,
      );
    }
  }
  @EventPattern(TOPIC_USER_UPDATE_REPLY)
  async logUpdateUser(): Promise<void> {
    this.appLogger.log(
      `[UsersController][${TOPIC_USER_UPDATE}][SEND] -> [updateUser]`,
    );
  }

  @MessagePattern(TOPIC_USER_REMOVE)
  async removeUser(@Payload() message: IKafkaMessage<string>): Promise<string> {
    try {
      this.appLogger.log(
        `[UsersController][${TOPIC_USER_UPDATE}] -> [updateUser]`,
      );
      return await this.usersService.remove(message.value);
    } catch (err) {
      this.appLogger.error(
        err,
        err.stack,
        `[UsersController][${TOPIC_USER_REMOVE}] -> [removeUser]`,
      );
    }
  }
  @EventPattern(TOPIC_USER_REMOVE_REPLY)
  async logRemoveUser(): Promise<void> {
    this.appLogger.log(
      `[UsersController][${TOPIC_USER_REMOVE}][SEND] -> [removeUser]`,
    );
  }
}
