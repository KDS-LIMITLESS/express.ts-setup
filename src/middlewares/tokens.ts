import jwt, { JwtPayload } from 'jsonwebtoken';
import * as e from 'express';
import * as dotenv from 'dotenv';
import { IReq } from '../Types/express';

dotenv.config();


interface TokenPayload extends JwtPayload {
  username: string;

}

/**
 * Function to generate user token. Token set to expire after 24hrs
 *  
 * 
 */
function generateToken(username: string, imageUrl: string): string 
{
  const secretKey = process.env.JWT_SECRET as string; 

  const payload: TokenPayload = { username, imageUrl };

  const options: jwt.SignOptions = {
    expiresIn: '24h', // Token expiration time
  };

  const token = jwt.sign(payload, secretKey, options);

  return token;
}


/**
 * Verify if a user is authenticated. 
 */

function verifyUser(req: IReq, res: e.Response , next: e.NextFunction): void {
  try {
    const secretKey = process.env.JWT_SECRET as string; 
    const authHeader = req.headers.authorization;
   
    // Bearer token not found in headers
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const token = authHeader.split(' ')[1];

    const decodedToken = jwt.verify(token, secretKey) as TokenPayload;
    // set the decoded user payload to the request user
    req.user = decodedToken;
    next();
    
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
}


export default{
  generateToken,
  verifyUser,
} as const;