import {Request,Response}from 'express'
import {container} from 'tsyringe'
import ListUserAppointmentService from '@modules/appointments/services/ListUserAppointmentService';
import { classToClass } from 'class-transformer';

export default class ProviderAppointmentsController{
    public async index(request:Request,response:Response): Promise<Response>{
    const user_id=request.user.id;
    const { day,month,year } = request.query;

    const listUserAppointments = container.resolve(ListUserAppointmentService)

    const appointments = await listUserAppointments.execute({
        user_id,
        day:Number(day),
        month:Number(month),
        year:Number(year),
    });

    return response.json(classToClass(appointments));
    }
}