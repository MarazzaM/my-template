"use client"
import React, { useEffect, useRef } from 'react';
import { Terminal } from "lucide-react"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

const ChatMessages = ({ messages, user }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the container
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="space-y-4 overflow-y-auto overflow-x-hidden" style={{ maxHeight: '400px' }}>
      {messages.length === 0 ? (
        <Alert className='w-fit m-4'>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            No messages yet. Be the first to send a message!
          </AlertDescription>
        </Alert>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            className={`flex flex-col ${
              message.userEmail === user
                ? 'items-end'
                : 'items-start'
            }`}
          >
            {message.userEmail !== user && (
              <span className="text-xs text-gray-500 mb-1">{message.userEmail}</span>
            )}
            <div
              className={`max-w-[80%] p-4 rounded ${
                message.userEmail === user
                  ? 'bg-green-500 text-white float-right'
                  : 'bg-gray-300 text-black float-left'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
