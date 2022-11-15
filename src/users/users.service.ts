import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { RpcException } from '@nestjs/microservices';
import { Op } from 'sequelize';
import { CheckPasswordDto } from './dto/check-password-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly usersRepository: typeof User,
  ) {}
  async create(createUserInput: CreateUserInput): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        [Op.or]: [
          { email: createUserInput.email },
          { phone: createUserInput.phone },
        ],
      },
    });
    if (user) {
      throw new RpcException('User with this email or phone already exists');
    }
    const createUser = await this.usersRepository.create(createUserInput, {
      raw: true,
    });
    createUser.setPassword('asdasd');

    return createUser.toJSON();
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    return user.toJSON();
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new RpcException('User not found');
    }
    return user.toJSON();
  }

  async checkValidPassword(dto: CheckPasswordDto): Promise<boolean> {
    const { email, password } = dto;
    const user = await this.usersRepository.findOne({ where: { email } });
    return user.validatePassword(password);
  }

  async update(updateUserInput: UpdateUserInput): Promise<User> {
    const { id, ...rest } = updateUserInput;
    const user = await this.usersRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new RpcException('User not found');
    }
    await this.usersRepository.update(rest, {
      where: { id: updateUserInput.id },
    });
    return await this.findById(user.id);
  }

  async remove(id: string): Promise<string> {
    await this.usersRepository.destroy({ where: { id } });
    return id;
  }
}
