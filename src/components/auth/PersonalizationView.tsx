"use client";

import * as React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { 
  Scissors, Hammer, ChefHat, Flame, Watch, 
  Store, Zap, Droplets, Sparkles, Shirt,
  UserPlus, Check, Camera
} from "lucide-react";
import { cn } from "@/lib/utils";

const TRADE_CHIPS = [
  { id: "tailor", label: "Tailor", icon: Scissors, color: "text-purple-500", bg: "bg-purple-100" },
  { id: "carpenter", label: "Carpenter", icon: Hammer, color: "text-amber-600", bg: "bg-amber-100" },
  { id: "baker", label: "Baker", icon: ChefHat, color: "text-yellow-600", bg: "bg-yellow-100" },
  { id: "electrician", label: "Electrician", icon: Zap, color: "text-cyan-500", bg: "bg-cyan-100" },
  { id: "hair_stylist", label: "Barber", icon: Sparkles, color: "text-rose-500", bg: "bg-rose-100" },
  { id: "photographer", label: "Photographer", icon: Camera, color: "text-blue-600", bg: "bg-blue-100" },
  { id: "other", label: "Other", icon: UserPlus, color: "text-gray-500", bg: "bg-gray-100" },
];

interface PersonalizationViewProps {
  initialName?: string;
  onSubmit: (data: { name: string, trade: string }) => Promise<void>;
  isLoading: boolean;
}

export function PersonalizationView({ initialName = "", onSubmit, isLoading }: PersonalizationViewProps) {
  const [name, setName] = useState(initialName);
  const [selectedTrade, setSelectedTrade] = useState<string | null>(null);
  const [customTrade, setCustomTrade] = useState("");

  const handleFinish = () => {
    if (name.trim()) {
      const finalTrade = selectedTrade === "other" ? customTrade.trim() : (selectedTrade || "other");
      onSubmit({ name: name.trim(), trade: finalTrade || "other" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-10 w-full"
    >
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-4xl font-black text-on-surface tracking-tight">
          Personalize your <span className="text-primary italic">Profile.</span>
        </h1>
        <p className="text-on-surface-variant font-medium">Almost there! Tell us a bit about you.</p>
      </div>

      <div className="flex flex-col gap-8">
        {/* Name Input */}
        <div className="flex flex-col gap-3">
          <label className="text-xs font-black uppercase tracking-widest text-on-surface-variant/60 ml-4">What's your name?</label>
          <Input 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            autoFocus
            className="h-20 text-2xl font-black rounded-[2rem] border-2 border-outline-variant focus:border-primary px-8 shadow-inner transition-all text-center placeholder:opacity-20"
          />
        </div>

        {/* Trade Selection */}
        <div className="flex flex-col gap-4">
          <label className="text-xs font-black uppercase tracking-widest text-on-surface-variant/60 ml-4">What is your trade? <span className="font-medium lowercase italic opacity-50">(Optional)</span></label>
          
          <div className="flex flex-wrap gap-3 p-2">
            {TRADE_CHIPS.map((trade) => (
              <button
                key={trade.id}
                onClick={() => setSelectedTrade(trade.id)}
                className={cn(
                  "flex items-center gap-2 px-5 py-3 rounded-full border-2 transition-all active:scale-95 text-sm font-black whitespace-nowrap",
                  selectedTrade === trade.id
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105"
                    : "bg-white text-on-surface-variant border-outline-variant hover:border-primary/30"
                )}
              >
                <trade.icon className={cn("w-4 h-4", selectedTrade === trade.id ? "text-white" : trade.color)} />
                <span>{trade.label}</span>
                {selectedTrade === trade.id && <Check className="w-4 h-4 ml-1" />}
              </button>
            ))}
          </div>

          {selectedTrade === "other" && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="px-2"
            >
              <Input 
                placeholder="What is your trade?"
                value={customTrade}
                onChange={(e) => setCustomTrade(e.target.value)}
                className="h-16 rounded-2xl border-2 focus:border-primary placeholder:opacity-20"
                autoFocus
              />
            </motion.div>
          )}
        </div>

        <Button
          onClick={handleFinish}
          isLoading={isLoading}
          disabled={!name.trim()}
          className="h-20 rounded-[2rem] text-xl font-black shadow-2xl shadow-primary/20 mt-4 active:scale-[0.98]"
        >
          {isLoading ? "Finalizing..." : "Complete Registration"}
        </Button>
      </div>
    </motion.div>
  );
}
