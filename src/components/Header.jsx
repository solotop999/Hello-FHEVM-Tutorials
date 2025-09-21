import { Github, Twitter, MessageCircle, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {
  return (
    <header className="w-full bg-black shadow-card sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-black bg-[#ffd200] p-2 rounded-sm font-bold text-xl">
          Zama Tutorials
        </Link>
        {/* <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <img src="/zama.png" alt="Logo" className="h-8 w-auto" />
        </Link> */}

        <div className="flex items-center gap-4">

          {/* Social icons */}
          <a href="https://github.com/solotop999/Hello-FHEVM-Tutorials" target="_blank" rel="noreferrer">
            <Github size={26} color="#ffd200"/>
          </a>
          <a href="https://x.com/solotop999" target="_blank" rel="noreferrer">
            <Twitter size={26} color="#ffd200"/>
          </a>
          <a href="https://t.me/solotop999" target="_blank" rel="noreferrer">
            <MessageCircle size={26} color="#ffd200"/>
          </a>

          {/* DEMO button */}
          <Link
            to="/demo"
            className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-lg hover:scale-105 transition"
          >
            <Play size={18} /> Demo
          </Link>
          
          {/* Wallet connect */}
          <ConnectButton />
        </div>
      </div>
    </header>
  );
}
