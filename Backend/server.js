import "dotenv/config";
import express from "express";
import cors from "cors";

import connectDB from "./src/db/db.js";
import Chat from "./src/models/chat.model.js";
import {askDSAInstructor} from "./DSA.js";

const PORT=process.env.PORT || 5000;

const app=express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://algo-mentor-ai.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());


await connectDB();


app.get("/",(req , res)=>{
    res.send("DSA Instructor Backend is Running")
});


//Create new chat
app.post("/api/chats", async (req, res)=>{
    try{
       const newChat= await Chat.create({
        title:"New Chat",
        messages:[],
       });

       res.status(201).json({
        success:true,
        chat:newChat,
       })
    }catch(error){
        console.error("Create Chat Error", error);

        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
});


//Get All Chats
app.get("/api/chats", async (req,res)=>{
    try{
       const chats=await Chat.find().select("_id title updatedAt").sort({updatedAt:-1});

       res.status(200).json({
        success:true,
        chats,
       });
    }catch(error){
        console.error("Create Chat Error", error);

        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
});

//Get Single Chat
app.get("/api/chats/:chatId",async (req, res)=>{
    try{
        const chat= await Chat.findById(req.params.chatId);

        if(!chat){
            return res.status(404).json({
                success:false,
                message:"Chat not found",
            });
        }

        res.status(200).json({
            success:true,
            chat,
        });
    }catch(error){
        console.error("Get Chat Error:", error);

        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
});

//Send Message
app.post("/api/chats/:chatId/messages", async(req,res)=>{
    try{
        const {message}= req.body;

        const chat= await Chat.findById(req.params.chatId);

        if(!chat){
            return res.status(404).json({
                success:false,
                message:"Chat not found."
            });
        }

        if(!message.trim()){
            return res.status(400).json({
                success:false,
                message:"Message is required",
            });
        }

        //Add user message
        chat.messages.push({
            role:"user",
            content:message,
        });

        const conversationHistory = chat.messages.map((msg) => ({
            role: msg.role,
            content: msg.content,
        })
    );


        //Update title on first message
        if(chat.messages.filter(
            (msg)=>msg.role === "user"
        ).length === 1)
        {
            chat.title=message.trim().length>35 ? `${message.trim().slice(0,35)}...`:message.trim();
        }

        //Get AI response
        const aiResponse= await askDSAInstructor(conversationHistory);

        //Add AI message
        chat.messages.push({
            role:"assistant",
            content:aiResponse,
        });

        await chat.save();

        res.status(200).json({
            success:true,
            chat,
        });
    }catch(error){
        console.error("Chat error", error);

        res.status(500).json({
            success:false,
            message:error.message,
        });

    }
});


//Delete Chat
app.delete("/api/chats/:chatId", async (req,res)=>{
    try{
        const chat=await Chat.findByIdAndDelete(req.params.chatId);

        if(!chat){
            return res.status(404).json({
                success:false,
                message:"Chat not found",
            });
        }

        res.status(200).json({
            success:true,
            message:"Chat deleted successfully",
        });
    }catch(error){
        console.error("Delete Chat Error:", error);

        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});