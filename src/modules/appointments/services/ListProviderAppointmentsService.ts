import { injectable,inject } from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import Appointment from '../infra/typeorm/entities/Appointment'
import { classToClass } from 'class-transformer';


//import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest{
  provider_id: string;
  day:number;
  month:number;
  year: number; 
}


@injectable()
export default class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    //@inject('CacheProvider')
    //private cacheProvider: ICacheProvider
  ) {}

  public async execute({ provider_id, day, year, month }: IRequest): Promise<Appointment[]> {
    const cacheKey = `provider-appointments:${provider_id}:${year}-${month}-${day}`
    //let appointments = await this.cacheProvider.recover<Appointment[]>(cacheKey)
    let appointments = null;
    if (!appointments) {
      appointments = await this.appointmentsRepository.findAllInDayFromProvider({
        provider_id,
        day,
        year,
        month,
    })
    //console.log('BUSCOU DOS PROVIDERS')
    //await this.cacheProvider.save(cacheKey,classToClass(appointments))
    }
    

    return appointments
  
  }

}