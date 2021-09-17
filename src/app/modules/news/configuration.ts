import { Configuration, App } from '@midwayjs/decorator';
import { ILifeCycle } from '@midwayjs/core';
import { Application } from 'egg';

/**
 * 特殊的中间件用法
 * https://dh6.ink/G1doT
 */

@Configuration()
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: Application;

  async onReady() {
    this.app.use(await this.app.generateMiddleware('reportMiddleware'));
  }
}
