import { Plus, MessageSquare, BrainCircuit } from "lucide-react";

function Sidebar() {
  return (
    <aside className="flex w-64 flex-col border-r border-white/10 bg-[#0f172a] p-4">
      <div className="mb-8 flex items-center gap-3">
        <div className="rounded-xl bg-blue-500 p-2">
          <BrainCircuit size={22} />
        </div>

        <div>
          <h1 className="font-bold">DSA Mentor</h1>
          <p className="text-xs text-gray-400">
            AI Interview Assistant
          </p>
        </div>
      </div>

      <button className="mb-6 flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 py-3 font-medium transition hover:bg-blue-600">
        <Plus size={18} />
        New Chat
      </button>

      <p className="mb-3 text-xs font-semibold uppercase text-gray-500">
        Recent Chats
      </p>

      <div className="space-y-2">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/5">
          <MessageSquare size={16} />
          Arrays
        </button>

        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/5">
          <MessageSquare size={16} />
          Binary Trees
        </button>

        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/5">
          <MessageSquare size={16} />
          Dynamic Programming
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;