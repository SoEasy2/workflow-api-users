import { Permission } from '../entities/permission.entity';
import { Permissions } from '../../shared/permissions/permission';

export class CreatePermissionDto implements Partial<Permission> {
  company: string;
  userId: string;
  permission: Permissions;
}
