import {Request, Response} from 'express'
import {container} from 'tsyringe'
import SendForgetEmailPasswordService from '@modules/users/services/SendForgetPasswordEmailService'
export default class ForgetPasswordController {
    public async create(request: Request, response:Response): Promise<Response>{
        
    const {email} = request.body;

    const sendForgetPasswordEmail =  container.resolve(SendForgetEmailPasswordService);

    await sendForgetPasswordEmail.execute({
    email,
})

    return response.status(204).json()

    }
}