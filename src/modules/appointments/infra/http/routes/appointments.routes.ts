import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import AppointmentsController from '../controllers/AppointmentsController'
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController'
import UserAppointmentsController from '../controllers/UserAppointmentController'

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController()
const providerAppointmentsController = new ProviderAppointmentsController()
const userAppointmentsController = new UserAppointmentsController()


appointmentsRouter.use(ensureAuthenticated)


appointmentsRouter.post('/',celebrate({
    [Segments.BODY]:{
        provider_id: Joi.string().uuid().required(),
        date: Joi.date()
    }
}),appointmentsController.create);

appointmentsRouter.get('/provider',providerAppointmentsController.index);
appointmentsRouter.get('/user',userAppointmentsController.index);



export default appointmentsRouter;