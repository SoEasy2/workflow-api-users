import { User } from '../entities/user.entity';
import { StepRegistration } from '../../shared/users/enums/stepRegistration';
export class CreateUserInput implements Partial<User> {
  email: string;
  phone: string;
  password?: string;
  stepRegistration: StepRegistration;
  sendCodeDate: Date;
  codeEmail: string;
}
