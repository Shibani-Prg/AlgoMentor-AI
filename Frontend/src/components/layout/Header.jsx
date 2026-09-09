import { Sparkles,Menu } from "lucide-react";

function Header({onMenuClick}) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-3 sm:px-5 md:px-8">
      
      {/* Left Section */}
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-gray-300 transition hover:bg-white/10 hover:text-white lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu size={22} />
        </button>

        <div className="min-w-0">
          <h2 className="truncate text-sm font-semibold sm:text-base">
            DSA AI Instructor
          </h2>

          <p className="truncate text-[10px] text-gray-400 sm:text-xs">
            Learn. Practice. Crack Interviews.
          </p>
        </div>
      </div>

        {/* Gemini Badge */}
        <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs sm:gap-2 sm:px-4 sm:py-2 sm:text-sm">
          <Sparkles
            size={15}
            className="text-blue-400 sm:hidden"
          />
        
          <Sparkles 
          size={16} 
          className="hidden text-blue-400 sm:block" 
          />

        <span className="hidden sm:inline">
            Gemini Powered
          </span>

        <span className="sm:hidden">
          AI
        </span>

      </div>
    </header>
  );
}

export default Header;