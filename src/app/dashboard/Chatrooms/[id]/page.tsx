"use client"

// Import the necessary components and styles
import { useState } from 'react';
import useSWR, { mutate } from 'swr';
import { Terminal } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useStore } from '@/store/store';
import ChatMessages from '@/components/Chatroom/ChatMessages';

// Fetcher function
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// ChatRoomPage component
export default function ChatRoomPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const user = useStore.getState().user;

  // Fetch data using useSWR
  const { data, error, isValidating } = useSWR(`/api/chatrooms/${id}`, fetcher);

  // Loading state for the send button
  const [sendingMessage, setSendingMessage] = useState(false);

  // State for the message input
  const [message, setMessage] = useState('');

  // Function to handle sending a message
// Function to handle sending a message
const sendMessage = async () => {
  try {
    // Set sendingMessage to true to show the loading indicator
    setSendingMessage(true);

    // Include id in the request body
    await fetch(`/api/chatrooms/${id}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, message, user }), // Include id in the body
    });

    // Fetch the latest chat data after sending the message
    const latestChatData = await fetcher(`/api/chatrooms/${id}`);

    // Update the entire chat data
    mutate(`/api/chatrooms/${id}`, latestChatData, false);

    // Clear the message input
    setMessage('');
  } catch (error) {
    console.error('Error sending message:', error.message);
  } finally {
    // Set sendingMessage back to false after the request is complete
    setSendingMessage(false);
  }
};


  if (error) {
    return <div>Error loading data</div>;
  }

  if (!data || isValidating || !data.chatRoom) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col bg-background justify-center items-center">
      <div className="flex-1 overflow-y-auto px-4 py-8 bg-background w-full">
        <h1 className="text-2xl font-bold mb-4">Chat Room <b>{data.chatRoom?.name}</b></h1>
        {/* Display chat messages */}
        <ChatMessages messages={data.chatRoom.messages} user={user} />
      </div>
  
      {/* Form to send messages */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        className="flex items-center  p-4 bg-background border-primary w-full flex-wrap gap-4"
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          disabled={sendingMessage} // Disable the button when sendingMessage is true
        >
          {sendingMessage ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}
