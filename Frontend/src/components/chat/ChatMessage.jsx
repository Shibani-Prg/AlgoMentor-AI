function ChatMessage({ role, content }) {

  const isUser = role === "user";

  return (
    <div
      className={`mb-6 flex ${
        isUser
          ? "justify-end"
          : "justify-start"
      }`}
    >

      <div
        className={`max-w-[80%] rounded-2xl px-5 py-4 ${
          isUser
            ? "bg-blue-500 text-white"
            : "border border-white/10 bg-white/[0.05] text-gray-200"
        }`}
      >

        <p className="whitespace-pre-wrap leading-7">
          {content}
        </p>

      </div>

    </div>
  );
}

export default ChatMessage;