/** service */

import { Provide } from '@midwayjs/decorator';

export interface User {
  id: number;
  name: string;
  age: number;
  description: string;
}

@Provide()
export class UserService {
  async getUsers(id: number): Promise<User> {
    return {
      id,
      name: 'MARS',
      age: 25,
      description: '这是一个测试接口，返回数据嘎嘎棒',
    };
  }
}
