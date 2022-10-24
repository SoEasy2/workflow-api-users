import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { from, Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @MessagePattern('user.create')
  // async createUser(
  //     @Payload() message,
  //     // @Args('createUserInput') createUserInput: CreateUserInput,
  // ) {
  //   console.log('THIS IS THE CREATE USER INPUT', message);
  //   // console.log('THIS IS THE CREATE USER INPUT', createUserInput);
  //   return "ASDASDASDSAD";
  //   //return await this.usersService.create(createUserInput);
  // }
  // @EventPattern("user.create.reply")
  // async logCreateUser(@Payload() message) {
  //   console.log("THIS IS THE CREATE USER INPUT", message);
  // }
}
