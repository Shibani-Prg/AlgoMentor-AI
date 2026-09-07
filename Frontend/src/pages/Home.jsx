import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import Welcome from "../components/chat/Welcome";
import ChatInput from "../components/chat/ChatInput";
import ChatMessage from "../components/chat/ChatMessage";

function Home() {

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (message) => {

    const userMessage = {
      role: "user",
      content: message,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setLoading(true);

    try {

      const response = await fetch(
        "http://localhost:5000/api/chat",
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

      if (!data.success) {
        throw new Error(data.message);
      }

      const aiMessage = {
        role: "assistant",
        content: data.response,
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);

    } catch (error) {

      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry bhai, backend se response nahi aaya 😢",
        },
      ]);

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="flex h-screen bg-[#0b0f19] text-white">

      <Sidebar />

      <main className="flex flex-1 flex-col">

        <Header />

        <div className="flex-1 overflow-y-auto">

          {messages.length === 0 ? (

            <Welcome onTopicSelect={handleSendMessage} />

          ) : (

            <div className="mx-auto max-w-4xl px-6 py-8">

              {messages.map((message, index) => (
                <ChatMessage
                  key={index}
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

        <ChatInput
          onSendMessage={handleSendMessage}
          loading={loading}
        />

      </main>

    </div>
  );
}

export default Home;