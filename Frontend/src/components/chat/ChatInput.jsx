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
    <div className="shrink-0 border-t border-white/10 bg-[#0b0f19] px-3 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5">
      
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-full max-w-4xl items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-1.5 sm:gap-3 sm:p-2"
      >
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask anything about DSA..."
          className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-gray-500 sm:px-4 sm:py-3 sm:text-base"
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading || !message.trim()}
          className="shrink-0 rounded-xl bg-blue-500 p-2.5 transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50 sm:p-3"
          aria-label="Send message"
        >
          <SendHorizontal size={19} className="sm:hidden" />
          <SendHorizontal size={20} className="hidden sm:block" />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;