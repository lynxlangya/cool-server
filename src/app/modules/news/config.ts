import { Application } from 'egg';
import { ModuleConfig } from 'midwayjs-cool-core';

/**
 * 模块配置
 */
export default (app: Application) => {
  return {
    // 模块名称
    name: 'news',
    // 模块描述
    description: '简单新闻模块',
    // 中间件，只对本模块有效
    middlewares: ['reportMiddleware'],
    // 中间件，全局有效
    globalMiddlewares: [],
    // 模块加载顺序，默认为0，值越大越优先加载
    order: 0,
  } as ModuleConfig;
};
