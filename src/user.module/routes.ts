import express from 'express';
import { userCTRL } from './controllers';


const router = express.Router();

router.post('/sign-up', userCTRL.createUser)
router.post('/login', userCTRL.login)


module.exports = router;