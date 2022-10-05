import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize(configService.get('database'));
      sequelize.addModels([]);
      await sequelize.sync();
      console.log(sequelize);
      return sequelize;
    },
    inject: [ConfigService],
  },
];
