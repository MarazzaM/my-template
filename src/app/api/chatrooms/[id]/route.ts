// Import necessary modules
import prisma from '@/lib/prisma';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }, response: Response
  ) {
  try {
    // Extract the chatroom ID from the params
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
      include: {
        messages: {
          orderBy: {
            createdAt: 'asc', // Adjust the sorting order as needed
          },
        },
      },
    });

    // Check if the chatroom exists
    if (!chatRoom) {
      return Response.json({ error: 'Chatroom not found.' });
    }

    // Return the fetched chatroom
    return Response.json({ chatRoom });
  } catch (error) {
    console.error('Error retrieving chatroom:', error.message);
    return Response.json({ error: 'Internal Server Error' });
  }
}
