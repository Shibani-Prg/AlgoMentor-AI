import { Sparkles } from "lucide-react";

function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-white/10 px-8">
      <div>
        <h2 className="font-semibold">DSA AI Instructor</h2>

        <p className="text-xs text-gray-400">
          Learn. Practice. Crack Interviews.
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
        <Sparkles size={16} className="text-blue-400" />
        Gemini Powered
      </div>
    </header>
  );
}

export default Header;