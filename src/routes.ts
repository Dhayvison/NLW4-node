import { Router } from 'express';
import { UserController } from './controllers/UserController';
import { SurveyController } from './controllers/SurveyController';

const router = Router();

const userController = new UserController();
const surveyController = new SurveyController();

router.post('/users', userController.create);
router.get('/users/:id?', userController.read);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.delete);

router.post('/survey', surveyController.create);
router.get('/survey/:id?', surveyController.read);
router.put('/survey/:id', surveyController.update);
router.delete('/survey/:id', surveyController.delete);

export { router };
