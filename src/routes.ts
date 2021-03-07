import { Router } from 'express';
import { SendMailController } from './controllers/SendMailController';
import { SurveyController } from './controllers/SurveyController';
import { UserController } from './controllers/UserController';

const router = Router();

const userController = new UserController();
const surveyController = new SurveyController();
const sendMailController = new SendMailController();

router.post('/users', userController.create);
router.get('/users/:id?', userController.read);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.delete);

router.post('/survey', surveyController.create);
router.get('/survey/:id?', surveyController.read);
router.put('/survey/:id', surveyController.update);
router.delete('/survey/:id', surveyController.delete);

router.post('/sendMail', sendMailController.sendMail);

export { router };
