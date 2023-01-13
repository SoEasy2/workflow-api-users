import { Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { StepRegistration } from 'src/shared/users/enums/stepRegistration';
import { TypeRegistration } from '../../shared/users/enums/typeRegistration';
import { StepConnect } from '../../shared/users/enums/stepConnect';
import { Languages } from '../../shared/users/enums/languages';

@Table({ timestamps: true, freezeTableName: true, tableName: 'user' })
export class User extends Model<User> {
  @Column({
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  })
  id: string;

  @Column({ type: DataTypes.STRING, allowNull: false, unique: true })
  email: string;

  @Column({ type: DataTypes.STRING, allowNull: false, unique: true })
  phone: string;

  @Column({ type: DataTypes.STRING, allowNull: true })
  codeEmail: string;

  @Column({ type: DataTypes.DATE, allowNull: true })
  sendCodeDate: Date;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: StepRegistration.REGISTRATION,
  })
  stepRegistration: StepRegistration | StepConnect;

  @Column({
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  })
  currentCompany?: string;

  @Column({
    type: DataTypes.ENUM(...Object.values(TypeRegistration)),
    defaultValue: TypeRegistration.REGISTRATION_DEFAULT,
    validate: {
      isIn: [Object.values(TypeRegistration)],
    },
  })
  typeRegistration: TypeRegistration;

  @Column({
    type: DataTypes.ENUM(...Object.values(Languages)),
    defaultValue: Languages.ENGLISH,
    validate: {
      isIn: [Object.values(Languages)],
    },
  })
  language: Languages;

  @Column({ type: DataTypes.STRING, allowNull: true, defaultValue: null })
  password?: string;

  @Column({ type: DataTypes.STRING, allowNull: true, defaultValue: null })
  salt?: string;

  @Column({ type: DataTypes.DATE, allowNull: true, defaultValue: null })
  createdAt: Date;

  @Column({ type: DataTypes.DATE, allowNull: true, defaultValue: null })
  updatedAt: Date;

  @Column({ type: DataTypes.STRING, allowNull: true, defaultValue: null })
  username?: string;
  @Column({ type: DataTypes.DATE, allowNull: true, defaultValue: null })
  birthday?: Date;
  @Column({ type: DataTypes.STRING, allowNull: true, defaultValue: null })
  address?: string;
  @Column({ type: DataTypes.STRING, allowNull: true, defaultValue: null })
  description?: string;
  @Column({ type: DataTypes.UUID, allowNull: true, defaultValue: null })
  manager?: string;
  @Column({ type: DataTypes.UUID, allowNull: true, defaultValue: null })
  department?: string;
}
