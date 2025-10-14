"use client"
import {Button } from "@repo/ui/button" 
import { sendMessage } from "./src";
import { useState, useEffect } from "react";
import { prismaClient } from "db/client";
       
export function ChatRoom(){
  const [inputValue, setInputValue] = useState("");
  const [chats, setChats] = useState<any[]>([]);

  useEffect(() => {
    async function fetchChats() {
      const chatMessages = await prismaClient.chat.findMany();
      setChats(chatMessages);
    }  
    fetchChats();
  }, []);
  return (
          <div>
          <input onChange={(e) => {
            setInputValue(e.target.value) }} type = "text" placeholder="Enter your message"/>
          <Button children = "Send Chat" onClick={() => {
            sendMessage(inputValue)
          }}></Button> 
         <div>
                 {chats.map((chat: any, idx: number) => (
              <div key={idx}>{chat.message}</div>
            ))}
         </div>
        </div> 
      );
}