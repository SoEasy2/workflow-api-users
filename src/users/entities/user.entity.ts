import { Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Field, ObjectType } from '@nestjs/graphql';

@Table({ timestamps: true, freezeTableName: true, tableName: 'users' })
@ObjectType()
export class User extends Model<User> {
  @Column({
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  })
  @Field(() => String, { description: 'Example field (uuid)' })
  id: string;
  @Column({ type: DataTypes.STRING, allowNull: false })
  @Field(() => String, { description: 'Example field (email)' })
  email: string;
  @Column({ type: DataTypes.STRING, allowNull: false })
  @Field(() => String, { description: 'Example field (phone)' })
  phone: string;
  @Column({ type: DataTypes.STRING, allowNull: true })
  @Field(() => String, {
    description: 'Example field (password)',
    nullable: true,
  })
  password?: string;
  @Column({ type: DataTypes.DATE, allowNull: true })
  @Field(() => String, {
    description: 'ISO date string',
    nullable: true,
  })
  createdAt: Date;
  @Column({ type: DataTypes.DATE, allowNull: true })
  @Field(() => String, {
    description: 'ISO date',
    nullable: true,
  })
  updatedAt: Date;
}
