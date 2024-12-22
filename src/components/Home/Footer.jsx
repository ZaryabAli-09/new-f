import React from "react";
import { FaDiscord } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-700 py-6 md:py-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center px-4">
        <div className="flex items-center space-x-4 mb-3">
          <a
            href="https://discord.gg/YOUR_DISCORD_LINK"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <FaDiscord className="text-2xl" />
          </a>
        </div>

        <div className="text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Icarus Ships. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;