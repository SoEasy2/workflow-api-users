import { Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import * as bcrypt from 'bcrypt';
import { StepRegistration } from 'src/shared/users/enums/stepRegistration';

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
  stepRegistration: StepRegistration;

  @Column({
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  })
  currentCompany?: string;

  @Column({ type: DataTypes.STRING, allowNull: true, defaultValue: null })
  password?: string;

  @Column({ type: DataTypes.STRING, allowNull: true, defaultValue: null })
  salt?: string;

  @Column({ type: DataTypes.DATE, allowNull: true, defaultValue: null })
  createdAt: Date;

  @Column({ type: DataTypes.DATE, allowNull: true, defaultValue: null })
  updatedAt: Date;

  @Column({ type: DataTypes.STRING, allowNull: true, defaultValue: null })
  username?: string

  async setPassword(password: string): Promise<void> {
    const saltOrRounds = 10;
    const salt = await bcrypt.genSalt(saltOrRounds);
    const hash = await bcrypt.hash(password, salt);
    this.password = hash;
    this.salt = salt;
  }

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
// User.addHook('setPassword', (user: User) => {
//   console.log('CHECK PASSWORD', user.password);
//   console.log('THIS', this);
// });
