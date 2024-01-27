"use client";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Swal from "sweetalert2";
import { useStore } from "@/store/store";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { MessageCircleCode } from "lucide-react";

export function ChatroomManagement(props) {
  const [chatRooms, setChatRooms] = useState([]);
  const [name, setName] = useState("");

  const startLogin = useStore((state) => state.startLogin);
  const email = props.email;
  startLogin(email);
  useEffect(() => {
    // Fetch chatrooms data from the API
    const fetchChatRooms = async () => {
      try {
        const response = await fetch("/api/chatrooms");
        const data = await response.json();
        setChatRooms(data.chatRooms);
      } catch (error) {
        console.error("Error fetching chatrooms:", error.message);
      }
    };

    fetchChatRooms();
  }, [email]);

  const onChatRoomCreated = (newChatRoom) => {
    // Update chat rooms state with the newly created chat room
    setChatRooms((prevChatRooms) => [...prevChatRooms, newChatRoom]);
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-right",
    customClass: {
      popup: "colored-toast",
    },
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });

  const addChatRoom = async () => {
    try {
      // Make a POST request to /api/chatroom using Axios
      const response = await axios.post("/api/chatrooms", { name });
      await Toast.fire({
        icon: "success",
        title: `Success creating room ${response.data.chatRoom.name}`,
        iconColor: "green",
      });

      // Handle the response as needed
      onChatRoomCreated(response.data.chatRoom);

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error creating chat room:", error.message);
      await Toast.fire({
        icon: "error",
        title: `Error creating room, ${error.message}`,
        iconColor: "red",
      });
    }
  };
  return (
    <div>
      <div className="flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="mb-4">
              Create Chatroom
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Chatroom</DialogTitle>
              <DialogDescription>
                Make a new place to share your ideas!
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" onClick={addChatRoom}>
                  Create
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableCaption>List of chatrooms</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="justify-end flex">Join this room</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {chatRooms.map((chatRoom) => (
            <TableRow key={chatRoom.id}>
              {/* <TableCell className="font-medium">{chatRoom.id}</TableCell> */}
              <TableCell>{chatRoom.name}</TableCell>
              <TableCell className="justify-end flex">
                <Button>
                  <MessageCircleCode className="mr-2 h-4 w-4" />{" "}
                  <Link href={`/dashboard/Chatrooms/${chatRoom.id}`}>
                    Join room {chatRoom.name}
                  </Link>
                </Button>
              </TableCell>
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
    </div>
  );
}
