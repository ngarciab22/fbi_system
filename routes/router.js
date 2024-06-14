import express from 'express';
import { loginPage, login, dashboard} from '../controllers/controller.js';

const router = express.Router();

router.get('/', loginPage);
router.post('/login', login);
router.get('/dashboard', dashboard);

export default router;