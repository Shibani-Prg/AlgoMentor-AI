import { SendHorizontal } from "lucide-react";
import { useState } from "react";

function ChatInput({ onSendMessage, loading }) {

  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!message.trim() || loading) return;

    onSendMessage(message);

    setMessage("");
  };

  return (
    <div className="border-t border-white/10 bg-[#0b0f19] px-6 py-5">

      <form
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-4xl items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-2"
      >

        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask anything about DSA..."
          className="flex-1 bg-transparent px-4 py-3 outline-none placeholder:text-gray-500"
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-blue-500 p-3 transition hover:bg-blue-600 disabled:opacity-50"
        >
          <SendHorizontal size={20} />
        </button>

      </form>

    </div>
  );
}

export default ChatInput;