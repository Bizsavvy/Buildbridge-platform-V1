"use client"

import { useState } from "react"
import { approveNeed, rejectNeed } from "./actions"
import { Button } from "@/components/ui/Button"
import { CheckCircle2, XCircle, Loader2, Clock, MapPin } from "lucide-react"

function formatCost(kobo: number) {
  return `₦${new Intl.NumberFormat("en-NG").format((kobo || 0) / 100)}`
}

function formatState(state: string | null) {
  if (!state) return ""
  return state.split("_").map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ")
}

export function AdminNeedList({ needs }: { needs: any[] }) {
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleApprove = async (id: string) => {
    setLoading(id)
    setError(null)
    try {
      await approveNeed(id)
      window.location.reload()
    } catch (err: any) {
      setError(err.message)
      setLoading(null)
    }
  }

  const handleReject = async (id: string) => {
    setLoading(id)
    setError(null)
    try {
      await rejectNeed(id)
      window.location.reload()
    } catch (err: any) {
      setError(err.message)
      setLoading(null)
    }
  }

  if (needs.length === 0) {
    return (
      <div className="p-16 rounded-[2rem] bg-surface border border-outline-variant/30 flex flex-col items-center gap-4 text-center">
        <div className="h-16 w-16 rounded-2xl bg-green-500/10 flex items-center justify-center">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-xl font-black text-on-surface">All caught up</h2>
        <p className="text-on-surface-variant">No pending needs to review.</p>
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

      <div className="rounded-[2rem] border border-outline-variant/30 bg-white overflow-hidden">
        {/* Table header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-surface-variant/30 border-b border-outline-variant/20 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60">
          <div className="col-span-3">Need</div>
          <div className="col-span-2">Artisan</div>
          <div className="col-span-2">Trade / Location</div>
          <div className="col-span-2">Cost</div>
          <div className="col-span-1">Date</div>
          <div className="col-span-2">Actions</div>
        </div>

        {needs.map((need) => (
          <div
            key={need.id}
            className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-6 py-5 border-b border-outline-variant/10 last:border-b-0 items-center hover:bg-surface-variant/10 transition-colors"
          >
            {/* Need info */}
            <div className="md:col-span-3">
              <p className="text-sm font-black text-on-surface line-clamp-1">{need.item_name}</p>
              <p className="text-xs text-on-surface-variant line-clamp-2 mt-1">{need.story}</p>
            </div>

            {/* Artisan */}
            <div className="md:col-span-2">
              <p className="text-sm font-bold text-on-surface">{need.profiles?.full_name || "Unknown"}</p>
            </div>

            {/* Trade & Location */}
            <div className="md:col-span-2">
              <p className="text-xs font-bold text-primary uppercase">
                {need.profiles?.trade_category?.replace(/_/g, " ") || "—"}
              </p>
              <div className="flex items-center gap-1 text-xs text-on-surface-variant mt-0.5">
                <MapPin className="h-3 w-3 shrink-0" />
                <span className="truncate">
                  {[need.profiles?.location_lga, formatState(need.profiles?.location_state)].filter(Boolean).join(", ") || "—"}
                </span>
              </div>
            </div>

            {/* Cost */}
            <div className="md:col-span-2">
              <p className="text-sm font-black text-on-surface">{formatCost(need.item_cost)}</p>
              {need.photo_url && (
                <img src={need.photo_url} alt="" className="h-8 w-8 rounded-lg object-cover mt-1" />
              )}
            </div>

            {/* Date */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-1 text-xs text-on-surface-variant">
                <Clock className="h-3 w-3" />
                {new Date(need.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
              </div>
            </div>

            {/* Actions */}
            <div className="md:col-span-2 flex items-center gap-2">
              <Button
                onClick={() => handleApprove(need.id)}
                disabled={loading === need.id}
                className="h-10 px-5 rounded-full text-xs font-black bg-success hover:bg-success/90 text-on-success shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 flex-1"
              >
                {loading === need.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                    Approve
                  </>
                )}
              </Button>
              <Button
                onClick={() => handleReject(need.id)}
                disabled={loading === need.id}
                variant="outline"
                className="h-10 px-4 rounded-full text-xs font-black border-red-200 text-red-600 hover:bg-red-50 flex-shrink-0"
              >
                <XCircle className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
