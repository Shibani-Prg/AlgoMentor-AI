import mongoose from "mongoose";

const messageSchema=new mongoose.Schema({
    role:{
        type:String,
        enum:["user","assistant"],
        required:true,
    },

    content:{
        type:String,
        required:true,
    },
},{
    timestamps:true,
});

const chatSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "New Chat",
    },

    messages: [messageSchema],
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;