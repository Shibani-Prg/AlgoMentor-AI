import {
  Plus,
  MessageSquare,
  BrainCircuit,
  Trash2,X,

} from "lucide-react";

function Sidebar({
  chats = [],
  activeChatId,
  onSelectChat,
  onNewChat,
  onDeleteChat,
  isOpen,
  onClose
}) 
  {
  const handleSelectChat = (chatId) => {
    onSelectChat(chatId);
    onClose?.();
  };

  const handleNewChat = async () => {
    await onNewChat();
    onClose?.();
  };

  return (

    <>
    {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-64 flex-col
          border-r border-white/10 bg-[#0f172a] p-4
          transition-transform duration-300 ease-in-out

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:static
          lg:z-auto
          lg:translate-x-0
          lg:shrink-0
        `}
      >
        {/* Logo */}
        <div className="mb-8 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-500 p-2">
              <BrainCircuit size={22} />
            </div>

            <div>
              <h1 className="font-bold">
                Algo-Mentor
              </h1>

              <p className="text-xs text-gray-400">
                AI Interview Assistant
              </p>
            </div>
          </div>

          {/* Close button - Mobile only */}
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* New Chat */}
        <button
          onClick={handleNewChat}
          className="mb-6 flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 py-3 font-medium transition hover:bg-blue-600"
        >
          <Plus size={18} />
          New Chat
        </button>

        {/* Recent Chats */}
        <p className="mb-3 text-xs font-semibold uppercase text-gray-500">
          Recent Chats
        </p>

        <div className="flex flex-1 flex-col gap-2 overflow-y-auto">
          {chats.length === 0 ? (
            <p className="px-3 py-2 text-sm text-gray-500">
              No chats yet
            </p>
          ) : (
            chats.map((chat) => (
              <div
                key={chat._id}
                className={`group flex w-full items-center rounded-lg transition ${
                  activeChatId === chat._id
                    ? "bg-blue-500/20"
                    : "hover:bg-white/5"
                }`}
              >
                {/* Select Chat */}
                <button
                  onClick={() => handleSelectChat(chat._id)}
                  className="flex min-w-0 flex-1 items-center gap-3 px-3 py-2 text-left text-sm text-gray-300"
                >
                  <MessageSquare
                    size={16}
                    className="shrink-0"
                  />

                  <span className="truncate">
                    {chat.title || "New Chat"}
                  </span>
                </button>

                {/* Delete Chat */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    const confirmed = window.confirm(
                      "Are you sure you want to delete this chat?"
                    );

                    if (confirmed) {
                      onDeleteChat(chat._id);
                    }
                  }}
                  className="
                    mr-2 rounded-md p-2 text-gray-500
                    opacity-100 transition
                    hover:bg-red-500/20 hover:text-red-400
                    sm:opacity-0 sm:group-hover:opacity-100
                  "
                  title="Delete chat"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </aside>
      </>
  );
}

export default Sidebar;