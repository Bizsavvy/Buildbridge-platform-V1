"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { NeedStepFlow } from "./NeedStepFlow";
import { AccountCreationView } from "./AccountCreationView";
import { PersonalizationView } from "./PersonalizationView";
import { adminSyncPhoneUser, syncUserRecord } from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Sparkles } from "lucide-react";

export function HighVelocityAuth() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [step, setStep] = useState<"discovery" | "account" | "personalization">("discovery");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Form State
  const [discoveryData, setDiscoveryData] = useState<any>(null);
  const [accountData, setAccountData] = useState<any>(null);
  const [initialName, setInitialName] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Check for existing session
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .maybeSingle();

        if (!profile || (!profile.full_name && !profile.name)) {
          setInitialName(session.user.user_metadata?.full_name || "");
          setStep("personalization");
        } else {
          router.push("/dashboard");
        }
      }
    };
    checkSession();
  }, [supabase, router]);

  const handleDiscoveryComplete = (data: any) => {
    setDiscoveryData(data);
    setStep("account");
  };

  const handleSkipToAccount = () => {
    setDiscoveryData(null);
    setStep("account");
  };

  const handleAccountSubmit = async (data: any) => {
    setIsLoading(true);
    setError(null);
    try {
      setAccountData(data);
      
      let email = data.identifier;
      if (!email.includes("@")) {
        let clean = email.trim();
        if (clean.startsWith("0") && clean.length === 11) clean = "+234" + clean.slice(1);
        else if (!clean.startsWith("+")) clean = "+234" + clean;
        email = `${clean.replace(/[^0-9]/g, '')}@buildbridge.app`;
      }

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password: data.password,
        options: {
          data: {
            full_name: data.name,
            is_tradesperson: true
          }
        }
      });

      if (authError) throw authError;

      const user = authData.user;
      if (!user) throw new Error("Signup failed - no user returned.");

      // Sync User & Profile immediately
      const syncRes = await syncUserRecord(user.id, data.name, data.identifier);
      if (!syncRes.success) throw new Error(syncRes.error);

      // Update Profile with Trade (if we have discovery data)
      if (discoveryData?.category) {
        const validCategories = [
          'tailor', 'carpenter', 'welder', 'cobbler', 'food_processor',
          'market_trader', 'baker', 'mechanic', 'electrician', 'plumber',
          'hair_stylist', 'blacksmith', 'other'
        ];
        const tradeKey = discoveryData.category.toLowerCase();
        const isEnumMatch = validCategories.includes(tradeKey);

        await supabase
          .from('profiles')
          .upsert({
            user_id: user.id,
            updated_at: new Date().toISOString(),
            trade_category: isEnumMatch ? tradeKey : 'other',
            trade_other_description: isEnumMatch ? null : discoveryData.category
          }, { onConflict: 'user_id' });

        // Create Need
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('user_id', user.id)
          .single();

        if (profile) {
          const deadlineDate = new Date();
          deadlineDate.setDate(deadlineDate.getDate() + 30);

          await supabase.from('needs').insert({
            profile_id: profile.id,
            item_name: discoveryData.itemName,
            item_cost: parseFloat(discoveryData.cost),
            story: (discoveryData.story || "").substring(0, 150),
            impact_statement: (discoveryData.impact || "").substring(0, 200),
            status: 'active',
            deadline: deadlineDate.toISOString().split('T')[0],
            photo_url: "/images/placeholders/need-default.png"
          });
        }
      }

      // Success! Go to dashboard
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message || "Signup failed. Please try again.");
      setIsLoading(false);
    }
  };

  if (!isMounted) return <div className="h-[600px] w-full max-w-xl bg-white/10 animate-pulse rounded-[2.5rem] border border-white/20" />;

  return (
    <Card hoverLift className="w-full max-w-xl mx-auto p-10 shadow-2xl rounded-[2.5rem] border-primary/10 overflow-hidden relative">
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        <Sparkles className="w-24 h-24 text-primary" />
      </div>
      <AnimatePresence mode="wait">
        {step === "discovery" && (
          <NeedStepFlow 
            key="discovery"
            onComplete={handleDiscoveryComplete}
            onSkip={handleSkipToAccount}
          />
        )}

        {step === "account" && (
          <AccountCreationView 
            key="account"
            onBack={() => setStep("discovery")}
            onSubmit={handleAccountSubmit}
            isLoading={isLoading}
          />
        )}
      </AnimatePresence>
      {error && (
        <p className="mt-4 text-error font-bold text-center bg-error/5 py-2 rounded-xl border border-error/10 animate-shake">{error}</p>
      )}
    </Card>
  );
}
