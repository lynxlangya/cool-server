/** service */
import { Provide } from '@midwayjs/decorator';
import { User } from '../interface';
@Provide()
export class UserService {
  async getUsers(id: number): Promise<User> {
    console.log(`%c id------- ${id}`, 'color: #4CAF50; font-weight: bold');
    return {
      id,
      name: 'MARS',
      age: 25,
      description: '这是一个测试接口，返回数据嘎嘎棒',
    };
  }
}
