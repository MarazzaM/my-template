// actions.ts
import prisma from '@/lib/prisma';
import { z } from 'zod';


export async function createChatRoom(
  prevState: {
    message: string;
  },
  formData: FormData,
) {
  const schema = z.object({
    name: z.string().min(1),
  });
  const parse = schema.safeParse({
    name: formData.get('name'),
  });

  if (!parse.success) {
    return { message: 'Failed to create chat room' };
  }

  const data = parse.data;

  try {
    await prisma.chatRoom.create({
      data: {
        name: data.name,
      },
    });

    return { message: `Created chat room ${data.name}` };
  } catch (e) {
    return { message: 'Failed to create chat room' };
  }
}

export async function deleteChatRoom(
  prevState: {
    message: string;
  },
  formData: FormData,
) {
  const schema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
  });
  const data = schema.parse({
    id: formData.get('id'),
    name: formData.get('name'),
  });

  try {
    await prisma.chatRoom.delete({
      where: {
        id: Number(data.id),
      },
    });

    return { message: `Deleted chat room ${data.name}` };
  } catch (e) {
    return { message: 'Failed to delete chat room' };
  }
}
