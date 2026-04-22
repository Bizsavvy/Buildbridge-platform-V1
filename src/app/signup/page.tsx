import { HighVelocityAuth } from "@/components/auth/HighVelocityAuth";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Join the Network | BuildBridge",
  description: "Create your artisan account and start building your legacy.",
};

export default function SignupPage() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] w-full flex-col items-center justify-center p-4">
      <Suspense fallback={<div className="h-96 w-full max-w-lg bg-white/50 animate-pulse rounded-[2.5rem]" />}>
        <HighVelocityAuth />
      </Suspense>
    </div>
  );
}
