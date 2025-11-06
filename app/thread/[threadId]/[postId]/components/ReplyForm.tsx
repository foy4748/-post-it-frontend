"use client";
import { useState } from "react";

export default function ReplyForm({ onSubmit }: { onSubmit: Function }) {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(content);
    //setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <button type="submit">Post Reply</button>
    </form>
  );
}
