import React from "react";
import { Metadata } from "next";
import { HowItWorksContent } from "./HowItWorksContent";

export const metadata: Metadata = {
  title: "How It Works | BuildBridge",
  description: "Understand the BuildBridge 4-step process for connecting tradespeople and backers.",
};

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden bg-[var(--color-surface)]">
      <HowItWorksContent />
    </div>
  );
}
