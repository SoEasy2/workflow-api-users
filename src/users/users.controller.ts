import { Controller, UseFilters } from '@nestjs/common';
import {
  EventPattern,
  MessagePattern,
  Payload,
  RpcException,
} from '@nestjs/microservices';
import {
  TOPIC_USER_CREATE,
  TOPIC_USER_CREATE_REPLY,
  TOPIC_USER_FIND_BY_EMAIL,
  TOPIC_USER_FIND_BY_EMAIL_OR_PHONE,
  TOPIC_USER_FIND_BY_EMAIL_OR_PHONE_REPLY,
  TOPIC_USER_FIND_BY_EMAIL_REPLY,
  TOPIC_USER_FIND_BY_ID,
  TOPIC_USER_FIND_BY_ID_REPLY,
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
@Controller('user')
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
      console.log('update user input', message.value);
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

  @MessagePattern(TOPIC_USER_FIND_BY_ID)
  async findById(@Payload() message: IKafkaMessage<string>): Promise<User> {
    try {
      this.appLogger.log(
        `[UsersController][${TOPIC_USER_FIND_BY_ID}] -> [findById]`,
      );
      return await this.usersService.findById(message.value);
    } catch (err) {
      this.appLogger.error(
        err,
        err.stack,
        `[UsersController][${TOPIC_USER_FIND_BY_ID}] -> [findById]`,
      );
    }
  }
  @EventPattern(TOPIC_USER_FIND_BY_ID_REPLY)
  async logFindOById(): Promise<void> {
    this.appLogger.log(
      `[UsersController][${TOPIC_USER_REMOVE}][SEND] -> [removeUser]`,
    );
  }

  @MessagePattern(TOPIC_USER_FIND_BY_EMAIL)
  async findByEmail(@Payload() message: IKafkaMessage<string>): Promise<User> {
    try {
      this.appLogger.log(
        `[UsersController][${TOPIC_USER_FIND_BY_EMAIL}] -> [findByEmail]`,
      );
      return await this.usersService.findByEmail(message.value);
    } catch (err) {
      this.appLogger.error(
        err,
        err.stack,
        `[UsersController][${TOPIC_USER_FIND_BY_EMAIL}] -> [findByEmail]`,
      );
    }
  }
  @EventPattern(TOPIC_USER_FIND_BY_EMAIL_REPLY)
  async logFindByEmail(): Promise<void> {
    this.appLogger.log(
      `[UsersController][${TOPIC_USER_FIND_BY_EMAIL}][SEND] -> [findByEmail]`,
    );
  }

  @MessagePattern(TOPIC_USER_FIND_BY_EMAIL_OR_PHONE)
  async findByEmailOrPhone(@Payload() message: IKafkaMessage<string>) {
    try {
      this.appLogger.log(
        `[UsersController][${TOPIC_USER_FIND_BY_EMAIL_OR_PHONE}] -> [findByEmailOrPhone]`,
      );
      return await this.usersService.findByEmailOrPhone(message.value);
    } catch (err) {
      this.appLogger.error(
        err,
        err.stack,
        `[UsersController][${TOPIC_USER_FIND_BY_EMAIL_OR_PHONE}] -> [findByEmailOrPhone]`,
      );
    }
  }
  @EventPattern(TOPIC_USER_FIND_BY_EMAIL_OR_PHONE_REPLY)
  async logFindByEmailOrPhone(): Promise<void> {
    this.appLogger.log(
      `[UsersController][${TOPIC_USER_FIND_BY_EMAIL_OR_PHONE}][SEND] -> [findByEmailOrPhone]`,
    );
  };
}
