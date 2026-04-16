import * as React from "react"
import { Badge, type BadgeLevelType } from "./Badge"
import { Card } from "./Card"
import { Info, ShieldCheck, Star, User, Lock } from "lucide-react"

export function BadgeDisplay() {
  const levels: { level: BadgeLevelType; criteria: string; impact: string }[] = [
    { 
      level: 0, 
      criteria: "Signed up to BuildBridge.", 
      impact: "Can browse needs and follow tradespeople." 
    },
    { 
      level: 1, 
      criteria: "Onboarding & Profile photo added.", 
      impact: "Can create first funding request (Need)." 
    },
    { 
      level: 2, 
      criteria: "2 Community vouches verified.", 
      impact: "Higher visibility in the Browse feed." 
    },
    { 
      level: 3, 
      criteria: "1 Need fully funded & Proof-of-use uploaded.", 
      impact: "Eligible for larger grant amounts." 
    },
    { 
      level: 4, 
      criteria: "Biometric Government ID (NIN) verified.", 
      impact: "Priority funding & Instant payout status." 
    },
  ]

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
         <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Info className="h-4 w-4" />
         </div>
         <h2 className="text-xl font-black text-on-surface">The Trust Ladder</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {levels.map((item) => (
          <Card key={item.level} className="p-4 flex flex-col gap-3 bg-surface border-outline-variant/30 hover:border-primary/50 transition-all group shadow-sm">
             <Badge level={item.level} className="scale-90 origin-left" />
             <div className="flex flex-col gap-1">
                <p className="text-[10px] uppercase font-black text-on-surface-variant tracking-widest opacity-60">Criteria</p>
                <p className="text-[11px] font-bold text-on-surface leading-tight line-clamp-2">{item.criteria}</p>
             </div>
             <div className="p-2.5 bg-surface-variant/20 rounded-lg mt-auto">
                <p className="text-[10px] font-black text-primary uppercase tracking-tighter mb-0.5">Impact</p>
                <p className="text-[10px] text-on-surface-variant font-medium leading-tight">{item.impact}</p>
             </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
