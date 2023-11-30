'use strict';

const appName = 'store';

export const config = {
  appName,
  environment: process.env.NODE_ENV,
  web: {
    port: process.env.APP_PORT,
  },
  logging: {
    file: process.env.LOG_PATH,
    level: process.env.LOG_LEVEL,
    console: process.env.LOG_ENABLE_CONSOLE || true,
  },
  salt: Number(process.env.SALT_WORK_FACTOR),
  baseUrl: process.env.BASE_URL,
  mongodb: {
    connection: {
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT) || 3306,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      debug: process.env.DATABASE_DEBUG || false,
      uri: process.env.MONGO_URI,
    },
    pool: {
      min: process.env.DATABASE_POOL_MIN
        ? Number(process.env.DATABASE_POOL_MIN)
        : 2,
      max: process.env.DATABASE_POOL_MAX
        ? Number(process.env.DATABASE_POOL_MAX)
        : 2,
    },
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT) || 6379,
    db: Number(process.env.REDIS_DB) || 0,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiry: process.env.JWT_EXPIRY,
  },
  amqp: {
    connection: {
      hostname: process.env.AMQP_HOST,
      port: process.env.AMQP_PORT,
      login: process.env.AMQP_USER,
      username: process.env.AMQP_USER,
      password: process.env.AMQP_PASSWORD,
      connectionTimeout: parseInt(process.env.AMQP_TIMEOUT),
      heartbeat: parseInt(process.env.AMQP_HEARTBEAT),
      appId: appName,
      vhost: '/',
    },
    consumers: {
      order_sync: {
        queueName: process.env.AMQP_ORDER_SYNC_QUEUE,
      },
    },
  },
  custom_link: {
    allowed_hosts: process.env.CUSTOM_LINK_ALLOWED_HOSTS || '',
  },
};
