import Appointment from '../infra/typeorm/entities/Appointment'
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO'
import IFindAllInMonthFromProviderDTO from '../dtos/IFindAllInMonthFromProviderDTO'
import IFindAllInDayFromProviderDTO from '../dtos/IFindAllInDayFromProviderDTO'
import IFindAllInDayFromUserDTO from '../dtos/IFindAllInDayFromUserDTO'
export default interface IAppointmentsRepository{
    create(data: ICreateAppointmentDTO): Promise<Appointment>;
    findByDate(date:Date, provider_id:string): Promise<Appointment | undefined>;
    findAllInMonthFromProvider(data: IFindAllInMonthFromProviderDTO):Promise<Appointment[]>
    findAllInDayFromProvider(data: IFindAllInDayFromProviderDTO):Promise<Appointment[]>
    findAllInDayFromUser(data: IFindAllInDayFromUserDTO):Promise<Appointment[]>

}