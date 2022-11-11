import { InputType, Field, ArgsType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { StepRegistration } from '../../shared/users/enums/stepRegistration';

@InputType()
@ArgsType()
export class CreateUserInput implements Partial<User> {
  @Field(() => String, { description: 'Example field (test@gmail.com)' })
  email: string;
  @Field(() => String, { description: 'Example field (+33333333)' })
  phone: string;
  @Field(() => String, { description: 'Example field (test)', nullable: true })
  password?: string;
  @Field(() => String, {
    description: 'Example field (step registration)',
    nullable: false,
  })
  stepRegistration: StepRegistration;
  @Field(() => String, {
    description: 'Example field (date send code)',
    nullable: false,
  })
  sendCodeDate: Date;
}
