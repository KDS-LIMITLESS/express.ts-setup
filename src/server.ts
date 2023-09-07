import express from 'express';
import 'express-async-errors'
import cors from 'cors';
import * as dotenv from 'dotenv';
import { connect } from './db.connection';

const app = express();

app.use(express.json());
app.use(cors()); 
dotenv.config();

// USER ROUTES
app.use('/api/v1/user', require('../src/user.module/routes'));


// register routes
const PORT = process.env.PORT || 3000; 

app.listen(PORT, async function start() {
  // CALL DATABASE CONECTION 
  await connect()
  console.log(`Server Listening for connections on port ${PORT}`);
});