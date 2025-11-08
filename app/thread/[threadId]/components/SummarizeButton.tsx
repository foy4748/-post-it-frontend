"use client";
import { getSummarizedThread } from "@/actions/thread/getSummarizedThread";
import { Button } from "@/components/ui/button";
import { BrainCircuit } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

function SummarizeButton() {
  const { threadId } = useParams();
  const [currentSummary, setSummary] = useState("");
  const [disabled, setDisabled] = useState(false);
  const handleSummarize = async () => {
    const { summary } = await getSummarizedThread(String(threadId));
    setSummary(summary);
    if (summary && summary?.length) {
      setDisabled(true);
    }
  };
  return (
    <>
      <div onClick={handleSummarize}>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 bg-transparent"
            disabled={disabled}
          >
            <BrainCircuit className="h-4 w-4" />
            Summarize
          </Button>
        </div>
      </div>
      {currentSummary && currentSummary?.length ? (
        <div className="mt-6">
          <h2 className="mb-3 text-xl font-bold text-foreground">Summary</h2>
          <p className="mb-4 line-clamp-2 text-muted-foreground">
            {currentSummary}
          </p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default SummarizeButton;
