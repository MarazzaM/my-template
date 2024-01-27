// Import necessary modules
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Handler for GET requests to /api/chatrooms/:id/messages
export async function GET( request: Request,
    { params }: { params: { id: string } }, response: Response) {
  try {
    const  id  = params.id;

    // Validate if the required ID is present
    if (!id) {
      return Response.json({ error: 'Chatroom ID is required.' });
    }

    // Fetch the specific chatroom from the ChatRoom table using Prisma
    const chatRoom = await prisma.chatRoom.findUnique({
      where: {
        id: String(id),
      },
    });

    // Check if the chatroom exists
    if (!chatRoom) {
      return Response.json({ error: 'Chatroom not found.' });
    }

    // Fetch chat messages for the specified chat room id
    const chatMessages = await prisma.message.findMany({
      where: {
        chatRoomId: parseInt(id as string),
      },
      orderBy: {
        createdAt: 'asc', // Adjust the sorting order as needed
      },
    });

    // Return the fetched chat messages along with the chatroom details
    Response.json({ chatRoom, chatMessages });
  } catch (error) {
    console.error('Error retrieving chat messages:', error.message);
    Response.json({ error: 'Internal Server Error' });
  }
}



export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, user, id } = body;

    // Validate if the required fields are present
    if (!message || !user || !id) {
      return NextResponse.json({ error: 'Message and user are required fields.' });
    }

    // Check if the specified user exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: user,
      },
    });

    if (!existingUser) {
      return NextResponse.json({ error: 'Specified user does not exist.' });
    }

    // Create a new message in the Message table using Prisma
    const createdMessage = await prisma.message.create({
      data: {
        content: message,
        chatRoomId: id,
        userEmail: user,
      },
    });

    // Return the created message
    return NextResponse.json({ message: createdMessage });
  } catch (error) {
    console.error('Error creating chat message:', error.message);
    return NextResponse.json({ error: 'Internal Server Error' });
  }
}
