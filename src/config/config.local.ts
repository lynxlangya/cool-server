/** 本地开发环境 */
import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import { CoolConfig } from 'midwayjs-cool-core';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  config.orm = {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'wangdaoo',
    database: 'cool',
    // 自动建表 注意：线上部署的时候不要使用，有可能导致数据丢失
    synchronize: false,
    // 打印日志
    logging: true,
    // 字符集
    charset: 'utf8mb4',
  };

  config.logger = {
    coreLogger: {
      consoleLevel: 'INFO',
    },
  };

  config.cool = {
    // 文件上传
    file: {
      // 文件路径前缀
      domain: 'http://localhost:9000/dev', // http://localhost:9000/dev
    },
  } as CoolConfig;

  return config;
};
