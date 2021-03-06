import { injectable,inject } from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'
import Appointment from '../infra/typeorm/entities/Appointment'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import { classToClass } from 'class-transformer';

//import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest{
  user_id: string;
  day:number;
  month:number;
  year: number; 
}


@injectable()
export default class ListUserAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

   // @inject('CacheProvider')
   // private cacheProvider: ICacheProvider
  ) {}

  public async execute({ user_id, day, year, month }: IRequest): Promise<Appointment[]> {
    const cacheKey = `user-appointments:${user_id}:${year}-${month}-${day}`
    //let appointments = await this.cacheProvider.recover<Appointment[]>(cacheKey)
    let appointments = null
  
    if (!appointments) {
      appointments = await this.appointmentsRepository.findAllInDayFromUser({
          user_id,
          day,
          year,
          month
      })
  
   // await this.cacheProvider.save(cacheKey,classToClass(appointments))
  }
    return appointments
  }
}