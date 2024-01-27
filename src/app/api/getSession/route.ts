// route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        // if using `NEXTAUTH_SECRET` env variable, we detect it, and you won't actually need to `secret`
        const token = await getToken({ req, secret });
    
        if (!token) {
          throw new Error('No token found');
        }
    
        console.log('JSON Web Token', token);
        return Response.json({ token });
      } catch (error) {
        console.error('Error retrieving token:', error.message);
      } return Response.json({ error: 'Internal Server Error' });
    }