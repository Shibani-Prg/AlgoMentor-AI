import { useEffect, useState , useRef, useLayoutEffect} from "react";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import Welcome from "../components/chat/Welcome";
import ChatInput from "../components/chat/ChatInput";
import ChatMessage from "../components/chat/ChatMessage";
import Footer from "../components/layout/Footer";

const API_URL = import.meta.env.VITE_API_URL;

function Home() {
const [chats, setChats] = useState([]);
const [activeChat, setActiveChat] = useState(null);
const [loading, setLoading] = useState(false);
 

//auto scroll down when we type a new query
const chatContainerRef = useRef(null); 

// Load chats after refresh
useEffect(() => {
loadChats();
}, []);

useLayoutEffect(() => {
  const container = chatContainerRef.current;

  if (!container) return;

  container.scrollTop = container.scrollHeight;
}, [
  activeChat?._id,
  activeChat?.messages?.length,
  loading,
]);

// Load all chats
const loadChats = async () => {
try {
const response = await fetch(`${API_URL}/chats`);
const data = await response.json();


  if (data.success) {
    setChats(data.chats);
  }
} catch (error) {
  console.error("Error loading chats:", error);
}

};

// Load selected chat
const loadChat = async (chatId) => {
try {
const response = await fetch(`${API_URL}/chats/${chatId}`);
const data = await response.json();


  if (data.success) {
    setActiveChat(data.chat);
  }
} catch (error) {
  console.error("Error loading chat:", error);
}


};

// Create new chat
const handleNewChat = async () => {
try {
const response = await fetch(`${API_URL}/chats`, {
method: "POST",
});


  const data = await response.json();

  if (!data.success) {
    throw new Error(data.message || "Could not create chat.");
  }

  setChats((prev) => [data.chat, ...prev]);
  setActiveChat(data.chat);

  return data.chat;
} catch (error) {
  console.error("Error creating chat:", error);
  return null;
}


};

const handleDeleteChat = async (chatId) => {
  try {
    const response = await fetch(
      `${API_URL}/chats/${chatId}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.message || "Failed to delete chat"
      );
    }

    // Get remaining chats
    const remainingChats = chats.filter(
      (chat) => chat._id !== chatId
    );

    // Update sidebar immediately
    setChats(remainingChats);

    // If currently opened chat was deleted
    if (activeChat?._id === chatId) {
      if (remainingChats.length > 0) {
        await loadChat(remainingChats[0]._id);
      } else {
        setActiveChat(null);
      }
    }
    
  } catch (error) {
    console.error("Delete Chat Error:", error);
  }
};

// Send message
const handleSendMessage = async (message) => {
if (!message.trim() || loading) return;


let currentChat = activeChat;

try {
  // Automatically create chat if none exists
  if (!currentChat) {
    currentChat = await handleNewChat();

    if (!currentChat) {
      throw new Error("Could not create a new chat.");
    }
  }

  setLoading(true);

  // Optimistic UI
  const userMessage = {
    _id: `temp-${Date.now()}`,
    role: "user",
    content: message,
  };

  setActiveChat((prev) => ({
    ...prev,
    messages: [...(prev?.messages || []), userMessage],
  }));

  const response = await fetch(
    `${API_URL}/chats/${currentChat._id}/messages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to send message.");
  }

  // Replace optimistic message with actual MongoDB chat
  setActiveChat(data.chat);

  // Refresh sidebar
  await loadChats();
} catch (error) {
  console.error("Send Message Error:", error);
} finally {
  setLoading(false);
}


};

return ( 
  <div className="flex h-screen overflow-hidden bg-[#0b0f19] text-white"> 
  <Sidebar
      chats={chats}
      activeChatId={activeChat?._id}
      onSelectChat={loadChat}
      onNewChat={handleNewChat}
      onDeleteChat={handleDeleteChat}
    />


    <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
      <Header />

      {/*Chat Area/*/}
      <div 
      ref={chatContainerRef}
      className="min-h-0 flex-1 overflow-y-auto">
        {!activeChat ||
        !activeChat.messages ||
        activeChat.messages.length === 0 ? (
          <Welcome onTopicSelect={handleSendMessage} />
        ) : (
          <div className="mx-auto max-w-4xl px-6 py-8">
            {activeChat.messages.map((message, index) => (
              <ChatMessage
                key={message._id || index}
                role={message.role}
                content={message.content}
              />
            ))}

            {loading && (
              <div className="py-4 text-gray-400">
                AI is thinking...
              </div>
            )}

          </div>
        )}
      </div>
      
      {/* Chat Input */}
      <div className="shrink-0">
        <ChatInput
        onSendMessage={handleSendMessage}
        loading={loading}
      />
      </div>
      
      <div className="shrink-0">
        <Footer/>
      </div>
    </main>
  </div>
);
}

export default Home;
