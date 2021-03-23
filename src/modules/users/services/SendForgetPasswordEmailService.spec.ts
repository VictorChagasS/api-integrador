import "reflect-metadata"
import SendForgetEmailPasswordService from './SendForgetPasswordEmailService';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository'
import AppError from "@shared/errors/AppError";

let fakeUsersRepository: FakeUsersRepository
let fakeMailProvider: FakeMailProvider
let fakeUserTokensRepository: FakeUserTokensRepository
let sendForgetPasswordEmail: SendForgetEmailPasswordService

describe('SendForgetPasswordEmail',  () => {
    beforeEach(()=>{
    fakeUsersRepository = new FakeUsersRepository()
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository()
    sendForgetPasswordEmail = new SendForgetEmailPasswordService(fakeUsersRepository, fakeMailProvider, fakeUserTokensRepository)
    })
    it('should be able to recover the passoword using the email', async ()=>{
  

       const sendMail = jest.spyOn(fakeMailProvider,'sendMail')

       await fakeUsersRepository.create({
           name:'John doe',
           email:'johndoe@gmail.com',
           password:'123456'
       })
       await sendForgetPasswordEmail.execute({
           email:'johndoe@gmail.com'
       })
       expect(sendMail).toHaveBeenCalled()
    })

    it('should not to able to recover on a non-existing user password', async ()=>{

        await expect(sendForgetPasswordEmail.execute({
            email:'johndoe@gmail.com'
        })).rejects.toBeInstanceOf(AppError)
    })

    it('should generate a forget passoword token', async ()=>{
      
        const generateToken = jest.spyOn(fakeUserTokensRepository,'generate')
       
        const user = await fakeUsersRepository.create({
            name:'John doe',
            email:'johndoe@gmail.com',
            password:'123456'
        })

        await sendForgetPasswordEmail.execute({
            email:'johndoe@gmail.com'
        })
        expect(generateToken).toHaveBeenCalledWith(user.id)
    })
})