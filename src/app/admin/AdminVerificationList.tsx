"use client"

import * as React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { CheckCircle2, XCircle, ShieldCheck, Calendar, MapPin, Briefcase, Loader2 } from "lucide-react"
import { approveVerification, rejectVerification } from "./actions"
import { cn } from "@/lib/utils"

interface VerificationItem {
  id: string
  profile_id: string
  nin_hash: string | null
  bvn_hash: string | null
  verified: boolean
  manual_review_required: boolean
  manual_review_completed: boolean
  created_at: string
  profile?: {
    id: string
    full_name: string | null
    trade_category: string | null
    location_state: string | null
    location_lga: string | null
    user_id: string
  }
}

interface Props {
  verifications: VerificationItem[]
}

export function AdminVerificationList({ verifications }: Props) {
  const [processing, setProcessing] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [items, setItems] = useState(verifications)

  const handleApprove = async (id: string) => {
    setProcessing(id)
    setError(null)
    try {
      await approveVerification(id)
      setItems((prev) => prev.filter((v) => v.id !== id))
    } catch (err: any) {
      setError(err.message)
    } finally {
      setProcessing(null)
    }
  }

  const handleReject = async (id: string) => {
    setProcessing(id)
    setError(null)
    try {
      await rejectVerification(id)
      setItems((prev) => prev.filter((v) => v.id !== id))
    } catch (err: any) {
      setError(err.message)
    } finally {
      setProcessing(null)
    }
  }

  if (items.length === 0) {
    return (
      <div className="p-10 rounded-[2.5rem] bg-surface border border-outline-variant/30 text-center">
        <ShieldCheck className="h-10 w-10 text-on-surface-variant/30 mx-auto mb-4" />
        <p className="text-sm font-bold text-on-surface-variant">No pending verifications</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-sm font-bold text-red-600">
          {error}
        </div>
      )}

      <AnimatePresence>
        {items.map((v) => {
          const isNIN = !!v.nin_hash
          const display = v.profile
          const shortHash = (v.nin_hash || v.bvn_hash || "").substring(0, 8)

          return (
            <motion.div
              key={v.id}
              layout
              initial={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, height: 0 }}
              className="p-6 rounded-[2rem] bg-surface border border-outline-variant/30 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={cn(
                      "px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest",
                      isNIN ? "bg-blue-500/10 text-blue-600" : "bg-purple-500/10 text-purple-600"
                    )}>
                      {isNIN ? "NIN" : "BVN"}
                    </span>
                    <span className="text-[10px] font-bold text-on-surface-variant/40">
                      ID: {shortHash}...
                    </span>
                  </div>

                  {display && (
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                      <span className="font-black text-on-surface">{display.full_name || "Unknown"}</span>
                      {display.trade_category && (
                        <span className="flex items-center gap-1 text-on-surface-variant">
                          <Briefcase className="h-3 w-3" />
                          {display.trade_category.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase())}
                        </span>
                      )}
                      {display.location_state && (
                        <span className="flex items-center gap-1 text-on-surface-variant">
                          <MapPin className="h-3 w-3" />
                          {[display.location_lga, display.location_state].filter(Boolean).join(", ")}
                        </span>
                      )}
                    </div>
                  )}

                  <p className="flex items-center gap-1 text-[10px] text-on-surface-variant/50 mt-2">
                    <Calendar className="h-3 w-3" />
                    Submitted {new Date(v.created_at).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    onClick={() => handleApprove(v.id)}
                    disabled={processing === v.id}
                    className="h-10 px-5 rounded-full text-xs font-black bg-success hover:bg-success/90 text-on-success shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 flex-1"
                  >
                    {processing === v.id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" />
                    ) : (
                      <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                    )}
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleReject(v.id)}
                    disabled={processing === v.id}
                    variant="outline"
                    className="h-10 px-4 rounded-full text-xs font-black border-red-200 text-red-600 hover:bg-red-50 flex-shrink-0"
                  >
                    <XCircle className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
