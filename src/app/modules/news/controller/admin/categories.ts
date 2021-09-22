import {
  Body,
  Get,
  Inject,
  Post,
  Provide,
  Redirect,
  RequestIP,
  RequestPath,
  SetHeader,
} from '@midwayjs/decorator';
import { CoolController, BaseController } from 'midwayjs-cool-core';
import { Context } from 'vm';
import { NewCategoriesEntity } from '../../entity/categories';
import { UserService } from '../../service/users';
import { ILogger } from '@midwayjs/logger';

/**
 * 新闻分类接口
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: NewCategoriesEntity,
  insertParam: async (ctx: Context) => {
    return { userId: ctx.admin.userId };
  },
  pageQueryOp: {
    keyWordLikeFields: ['name', 'description'],
  },
})
export class NewAdminCategoriesController extends BaseController {
  @Inject()
  logger: ILogger;

  @Inject()
  ctx: Context;

  /** 其他接口 */
  @Get('/other')
  /**
   * 响应头信息
   * 单个：@SetHeader('key', 'value')
   * 多个：Object 形式 👇
   */
  @SetHeader({
    Hello: 'World',
    key: 'value',
  })
  async other() {
    this.logger.error('---> Logger 测试');
    const obj = {
      list: [{ name: '1', id: 2 }],
      message: 'Hello this is /other api - GET',
    };
    return this.ok(obj);
  }

  @Inject()
  userService: UserService;
  @Post('/stock', { middleware: ['loggerMiddleware'] })
  async stock(@Body() id: any) {
    // 获取 body 下所有属性，@Body(ALL) param: any
    const user = await this.userService.getUsers(id);
    return this.ok(user);
  }

  @Get('/redirect')
  /** 接口重定向 */
  @Redirect('/admin/news/categories/other')
  async redirect() {
    return this.ok('Hello This is Redirect - GET');
  }

  @Post('/path')
  // @ContentType('html')
  async path(@RequestPath() path: string, @RequestIP() ip: string) {
    console.log('PATH--------', path);
    console.log('IP--------', ip);
    const data = { path, ip };
    return this.ok(data);
  }
}
