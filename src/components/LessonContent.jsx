import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "./CodeBlock";

export default function LessonContent({ file }) {
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!file) return;

    const path = `/content/FHEVM-Solidity/${file}`;
    fetch(path)
      .then((res) => res.text())
      .then((text) => {
        if (text.startsWith("<!doctype html>")) {
          setContent("⚠️ File not found. Check if it's in public/content/FHEVM-Solidity/");
        } else {
          setContent(text);
        }
      })
      .catch(() => setContent("⚠️ Failed to load content."));
  }, [file]);

  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ inline, className, children, ...props }) {
            const hasLanguage = className && className.startsWith("language-");
            const language = hasLanguage ? className.replace("language-", "") : "";
            const codeString = String(children).replace(/\n$/, "");

            // ✅ Inline code hoặc không có className => luôn để mặc định
            if (inline || !hasLanguage) {
              return <code {...props}>{children}</code>;
            }

            // ✅ Block code có language → highlight với CodeBlock
            return (
              <CodeBlock codeString={codeString} language={language} {...props} />
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
