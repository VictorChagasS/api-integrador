import "reflect-metadata"
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import AppError from "@shared/errors/AppError";
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/fakeCacheProvider'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let fakeNotificationsRepository: FakeNotificationsRepository
let createAppointment: CreateAppointmentService
let fakeCacheProvider: FakeCacheProvider

describe('CreateAppointment',  () => {
    beforeEach(()=>{
        fakeAppointmentsRepository = new FakeAppointmentsRepository()
        fakeNotificationsRepository = new FakeNotificationsRepository()
        fakeCacheProvider = new FakeCacheProvider()
        createAppointment = new CreateAppointmentService(fakeAppointmentsRepository,fakeNotificationsRepository)

    })
    it('should be able to create a new appointment', async ()=>{
        jest.spyOn(Date, 'now').mockImplementationOnce(()=> {
            return new Date(2021, 4, 10,12).getTime()
        })

       const appointment = await createAppointment.execute({
           date: new Date(2021, 4, 10,13),
           user_id:'111111',
           provider_id: '121212',
            
       })
       expect(appointment).toHaveProperty('id')
       expect(appointment.provider_id).toBe('121212')
    })

    it('should not be able to create two appointments on the same time',async ()=>{
      const appointmentDate = new Date(2021,2,21,11)

      await createAppointment.execute({
          date: appointmentDate,
          user_id:'111111',
          provider_id: '121212',
          
      })
      await expect(createAppointment.execute({
        date: appointmentDate,
        user_id:'111111',
        provider_id: '121212',     
    })).rejects.toBeInstanceOf(AppError)
      })

    it('should not be able to create an appointment on a past date',async()=>{
        jest.spyOn(Date, 'now').mockImplementationOnce(()=> {
            return new Date(2021, 4, 10,12).getTime()
        })

        await expect(createAppointment.execute({
            date: new Date(2021,4,10,11),
            user_id:'111111',
            provider_id: '121212',     
        })).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to create an appointment with same user as provider',async()=>{
        jest.spyOn(Date, 'now').mockImplementationOnce(()=> {
            return new Date(2021, 4, 10,1).getTime()
        })

        await expect(createAppointment.execute({
            date: new Date(2021,4,10,13),
            user_id:'111111',
            provider_id: '111111',     
        })).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to create an appointment with same user as provider',async()=>{
        jest.spyOn(Date, 'now').mockImplementationOnce(()=> {
            return new Date(2021, 4, 10,1).getTime()
        })

        await expect(createAppointment.execute({
            date: new Date(2021,4,10,13),
            user_id:'111111',
            provider_id: '111111',     
        })).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to create an appointment before 8am and after 5pm',async()=>{
        jest.spyOn(Date, 'now').mockImplementationOnce(()=> {
            return new Date(2021, 4, 10,1).getTime()
        })

        await expect(createAppointment.execute({
            date: new Date(2021,4,11,7),
            user_id:'111111',
            provider_id: '222222',     
        })).rejects.toBeInstanceOf(AppError)

        await expect(createAppointment.execute({
            date: new Date(2021,4,11,18),
            user_id:'111111',
            provider_id: '222222',     
        })).rejects.toBeInstanceOf(AppError)
    })


  })