import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./src/db/db.js";
import Chat from "./src/models/chat.model.js";
import {askDSAInstructor} from "./DSA.js";


dotenv.config();

const app=express();

app.use(cors());
app.use(express.json());

const PORT=5000;
await connectDB();


app.get("/",(req , res)=>{
    res.send("DSA Instructor Backend is Running")
});


//Create New Chat
app.post("/api/chat", async (req, res)=>{
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

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});