import { fetchPendingNeeds } from "./actions"
import { AdminNeedList } from "./AdminNeedList"
import { ShieldCheck } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function AdminPage() {
  let needs: any[] = []
  let error: string | null = null

  try {
    needs = await fetchPendingNeeds()
  } catch (err: any) {
    error = err.message
  }

  return (
    <main className="min-h-screen bg-surface pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-2xl bg-amber-500/10 flex items-center justify-center">
            <ShieldCheck className="h-5 w-5 text-amber-600" />
          </div>
          <h1 className="text-3xl font-black text-on-surface tracking-tight">
            Needs Review
          </h1>
        </div>
        <p className="text-on-surface-variant mb-10">
          Approve or reject pending funding requests. Approved needs become publicly visible.
        </p>

        {error ? (
          <div className="p-6 rounded-2xl bg-red-50 border border-red-200">
            <p className="text-sm font-bold text-red-600">Failed to load needs: {error}</p>
          </div>
        ) : (
          <AdminNeedList needs={needs} />
        )}
      </div>
    </main>
  )
}
