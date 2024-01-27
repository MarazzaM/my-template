// route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Fetch all sessions from the Session table using Prisma
    const chatRooms = await prisma.chatRoom.findMany();

    // Return the fetched sessions
    return Response.json({ chatRooms });
  } catch (error) {
    console.error('Error retrieving sessions:', error.message);
    Response.json({ error: 'Internal Server Error' });
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Destructure the 'name' directly from 'body'
  const { name } = body;


  if (!name) {
    return Response.json({ error: 'Name is a required field.' });
  }

  // Create a new chat room in the ChatRoom table using Prisma
  const createdChatRoom = await prisma.chatRoom.create({
    data: {
      name,
    },
  });

  return NextResponse.json({ chatRoom: createdChatRoom });
}
