import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { User } from '../../users/entities/user.entity';
import { Permissions } from '../../shared/permissions/permission';

@Table({ timestamps: true, freezeTableName: true, tableName: 'permission' })
export class Permission extends Model<Permission> {
  @Column({
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  })
  id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataTypes.UUID,
    allowNull: false,
  })
  userId: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  company: string;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataTypes.INTEGER,
    defaultValue: Permissions.MEMBER,
    allowNull: false,
  })
  permission: Permissions;

  @Column({ type: DataTypes.DATE, allowNull: true, defaultValue: null })
  createdAt: Date;

  @Column({ type: DataTypes.DATE, allowNull: true, defaultValue: null })
  updatedAt: Date;
}
