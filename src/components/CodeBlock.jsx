import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeBlock({ codeString, language, ...props }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeString);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000); // 1 giây
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 text-xs bg-gray-700 px-2 py-1 rounded transition"
      >
        {copied ? "✅ Copied!" : "📋 Copy"}
      </button>

      <SyntaxHighlighter
        style={vscDarkPlus}
        language={language}
        PreTag="div"
        customStyle={{
          borderRadius: "8px",
          padding: "16px",
          fontSize: "14px",
          margin: 0,
        }}
        {...props}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
}
