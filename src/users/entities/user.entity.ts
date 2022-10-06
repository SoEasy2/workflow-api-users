import { Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Field, ObjectType } from '@nestjs/graphql';

@Table({ timestamps: true, tableName: 'users' })
@ObjectType()
export class User extends Model<User>{
  @Column({ primaryKey: true, type: DataTypes.UUIDV4 })
  @Field(() => String, { description: 'Example field (uuid)' })
  id: string;
  @Column({ type: DataTypes.STRING, allowNull: false })
  @Field(() => String, { description: 'Example field (email)' })
  email: string
  @Column({ type: DataTypes.STRING, allowNull: false })
  @Field(() => String, { description: 'Example field (phone)' })
  phone: string
  @Column({ type: DataTypes.STRING, allowNull: true })
  @Field(() => String, { description: 'Example field (password)', nullable:true })
  password?: string
}
