import { config } from '../config/config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mongodb',
  // host: config.mongodb.connection.host,
  // username: config.mongodb.connection.user,
  // password: config.mongodb.connection.password,
  database: config.mongodb.connection.database,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/app/db/migrations/*.js'],
  url: config.mongodb.connection.uri,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
