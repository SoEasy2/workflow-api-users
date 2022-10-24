import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { EventPattern, MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { TOPIC_USER_CREATE, TOPIC_USER_CREATE_REPLY } from '../common/constants';


@Resolver('User')
@Controller('user')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => String, { name: 'create' })
  @MessagePattern('user.create')
  async createUser(
      @Payload() message,
      // @Args('createUserInput') createUserInput: CreateUserInput,
  ) {
   try{
     console.log('THIS IS THE CREATE USER INPUT', message);
     // console.log('THIS IS THE CREATE USER INPUT', createUserInput);
     return "ASDASDASDSAD";
     //return await this.usersService.create(createUserInput);
   }catch (e) {
     throw new RpcException(e.message);
   }
  }
  @EventPattern("user.create.reply")
  async logCreateUser(@Payload() message) {
    console.log("THIS IS THE CREATE USER INPUT", message);
  }


  // @Mutation(() => String)
  // @MessagePattern('user.create')
  // async createUser(
  //   @Payload() message,
  //   // @Args('createUserInput') createUserInput: CreateUserInput,
  // ) {
  //   console.log('THIS IS THE CREATE USER INPUT', message);
  //  // console.log('THIS IS THE CREATE USER INPUT', createUserInput);
  //   return "ASDASDASDSAD";
  //   //return await this.usersService.create(createUserInput);
  // }
  // @EventPattern("user.create.reply")
  // async logCreateUser(@Payload() message: CreateUserInput) {
  //   console.log("THIS IS THE CREATE USER INPUT", message);
  // }

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
