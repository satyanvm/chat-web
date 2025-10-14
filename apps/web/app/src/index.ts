
"use client"
export async function sendMessage(message: string) {

    // put the token here
    const socket = new WebSocket('')

    // socket.onopen = () => {
    //     socket.send(JSON.stringify({
    //         type:"join_room",
    //         ws: socket,
    //         roomId: 1
    //     })) 
    // }

    socket.send(JSON.stringify({ 
        type: "message",
        roomId: 1, 
        message: message 
    }))  

} 