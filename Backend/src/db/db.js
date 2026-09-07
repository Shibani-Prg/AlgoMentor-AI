import Chat from "../models/chat.model";

import mongoose from "mongoose";

const connectDB= async ()=>{
    try{
        const connectionInstance=await mongoose.connect(process.env.MONGODB_URI);

        console.log(`MongoDB Connected: ${connectionInstance.connection.host}`);

    }catch(error){
        console.error("MongoDB Connection error:", error.message);
        process.exit(1);
    }
};

export default Chat;