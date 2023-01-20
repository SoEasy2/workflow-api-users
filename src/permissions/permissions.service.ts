import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Permission } from './entities/permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { Op } from 'sequelize';
import { RpcException } from '@nestjs/microservices';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission)
    private readonly permissionsRepository: typeof Permission,
  ) {}
  async create(dto: CreatePermissionDto): Promise<Permission> {
    const { company, userId } = dto;
    const permissionDB = await this.permissionsRepository.findOne({
      where: {
        [Op.and]: [{ userId }, { company }],
      },
    });
    if (permissionDB) throw new RpcException('Duplicate permission in system');
    const permission = await this.permissionsRepository.create(dto);
    return permission.toJSON();
  }

  async update(dto: UpdatePermissionDto): Promise<Permission> {
    const { userId, company, ...rest } = dto;
    const permissionDB = await this.permissionsRepository.findOne({
      where: {
        [Op.and]: [{ userId }, { company }],
      },
    });
    if (permissionDB) throw new RpcException('Duplicate permission in system');
    await this.permissionsRepository.update(rest, {
      where: { id: permissionDB.id },
    });
    const permissions = await this.permissionsRepository.findOne({
      where: { id: permissionDB.id },
    });
    return permissions.toJSON();
  }
}
