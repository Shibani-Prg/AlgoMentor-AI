import { BrainCircuit, Heart } from "lucide-react";

function Footer() {
  return (
    <footer className="shrink-0 border-t border-white/10 bg-[#0f172a] px-6 py-3">
      
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-xs text-gray-400 md:flex-row">

        {/* Left */}
        <div className="flex items-center gap-2">
          <BrainCircuit
            size={16}
            className="text-blue-500"
          />

          <span>
            © {new Date().getFullYear()} Algo-Mentor
          </span>
        </div>

        {/* Center */}
        <div className="flex items-center gap-1">
          <span>Built with</span>

          <Heart
            size={14}
            className="text-red-400"
          />

          <span>for DSA learners</span>
        </div>

        {/* Right */}
        <a
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 transition hover:text-white"
        >
         
        </a>

      </div>

    </footer>
  );
}

export default Footer;