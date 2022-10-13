import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UsersResolver {

  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return await this.usersService.create(createUserInput);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return await this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  async deleteUser(@Args('id') id: string): Promise<string> {
    return await this.usersService.remove(id);
  }

  @Query(() => User)
  async getOneUser(@Args('id') id: string): Promise<User> {
    return await this.usersService.findOne(id);
  }
  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.findAll();
  }
}
