import {injectable,inject} from 'tsyringe'

import User from '../infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'

interface IRequest{
    name:string;
    email:string;
    password:string;
    isBarber?:boolean

}

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,

        //@inject('CacheProvider')
        //private cacheProvider: ICacheProvider
        ){}
    async execute({name, email, password, isBarber}: IRequest): Promise<User>{


    const checkUserExists = await this.usersRepository.findByEmail(email)

    if (checkUserExists){
        throw new AppError('Email adress already used')
    }
    const hashedPassword = await this.hashProvider.generateHash(password)
    const user = await this.usersRepository.create({
        name,
        email,
        password:hashedPassword,
        isBarber

    })

    //await this.cacheProvider.invalidatePrefix('provider-list')

    return user
    }
    
}

export default CreateUserService