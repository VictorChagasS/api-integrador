import { injectable, inject } from 'tsyringe';
import {classToClass} from 'class-transformer'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest{
  user_id: string;
}

@injectable()
export default class ListProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    let users = await this.cacheProvider.recover<User[]>(`provider-list:${user_id}`)

    if (!users){
    users = await this.usersRepository.findAllProviders({except_user_id: user_id,});
    //console.log('A query no banco foi feita')

    await this.cacheProvider.save(`provider-list:${user_id}`, classToClass(users))
    }
    return users;
  }
}