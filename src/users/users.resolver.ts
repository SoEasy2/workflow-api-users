import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';

interface IKafkaMessage<T> {
  topic: string;
  partition: number;
  timestamp: string;
  size: number;
  attributes: number;
  offset: string;
  key: any;
  value: T;
  headers: Record<string, any>;
}
@Resolver()
@Controller()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('add.new.post')
  killDragon(@Payload() message): string {
    console.log(message, 'ASDASDASDASDASDASDASD');
    return 'asd';
  }

  // @Mutation(() => User)
  // @MessagePattern('test')
  // async createUser(
  //   @Payload() message,
  //   // @Args('createUserInput') createUserInput: CreateUserInput,
  // ) {
  //   console.log('THIS IS THE CREATE USER INPUT', message);
  //   return "ASDASDASDSAD";
  //   //return await this.usersService.create(createUserInput);
  // }
  //
  // @Mutation(() => User)
  // async updateUser(
  //   @Args('updateUserInput') updateUserInput: UpdateUserInput,
  // ): Promise<User> {
  //   return await this.usersService.update(updateUserInput.id, updateUserInput);
  // }
  //
  // @Mutation(() => User)
  // async deleteUser(@Args('id') id: string): Promise<string> {
  //   return await this.usersService.remove(id);
  // }
  //
  // @Query(() => User)
  // async getOneUser(@Args('id') id: string): Promise<User> {
  //   return await this.usersService.findOne(id);
  // }
  // @Query(() => [User])
  // async getAllUsers(): Promise<User[]> {
  //   return await this.usersService.findAll();
  // }
}
