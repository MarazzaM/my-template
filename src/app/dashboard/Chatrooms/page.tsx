import React from 'react'
import { ChatroomManagement } from '@/components/Chatroom/CreateChatroomBtn'
import { getServerSession } from "next-auth/next";

export default async function page() {
  const session = await getServerSession();
const email = session.user.email

  return (
    <div>
      <ChatroomManagement email={email} />
    </div>
  )
}
