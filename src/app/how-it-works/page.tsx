import React from "react";
import { Metadata } from "next";
import { HowItWorksContent } from "./HowItWorksContent";
import { Stats } from "@/components/home/Stats";

export const metadata: Metadata = {
  title: "How It Works | BuildBridge",
  description: "Understand the BuildBridge 4-step process for connecting tradespeople and backers.",
};

const MOCK_STATS = {
  totalFunded: 45200000,
  totalTradespeople: 1284,
};

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden bg-[var(--color-surface)]">
      <HowItWorksContent />
      <Stats stats={MOCK_STATS} isLoading={false} />
    </div>
  );
}
