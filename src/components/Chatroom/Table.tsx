"use client"
import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function TableChat() {
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    // Fetch chatrooms data from the API
    const fetchChatRooms = async () => {
      try {
        const response = await fetch('/api/chatrooms');
        const data = await response.json();
        setChatRooms(data.chatRooms);
      } catch (error) {
        console.error('Error fetching chatrooms:', error.message);
      }
    };

    fetchChatRooms();
  }, []);

  return (
    <Table>
      <TableCaption>List of chatrooms</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {chatRooms.map((chatRoom) => (
          <TableRow key={chatRoom.id}>
            <TableCell className="font-medium">{chatRoom.id}</TableCell>
            <TableCell>{chatRoom.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* You may need to adjust this part based on your actual data structure */}
      <TableFooter>
        <TableRow>
          <TableCell colSpan={1}>Total</TableCell>
          <TableCell className="text-right">{chatRooms.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
