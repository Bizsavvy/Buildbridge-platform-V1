"use server"

import { createClient as createAdminClient } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function approveNeed(needId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")

  const supabaseAdmin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { error } = await supabaseAdmin
    .from("needs")
    .update({ status: "active", published_at: new Date().toISOString() })
    .eq("id", needId)

  if (error) throw new Error(error.message)

  revalidatePath("/admin")
  return { success: true }
}

export async function rejectNeed(needId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")

  const supabaseAdmin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { error } = await supabaseAdmin
    .from("needs")
    .update({ status: "rejected" })
    .eq("id", needId)

  if (error) throw new Error(error.message)

  revalidatePath("/admin")
  return { success: true }
}

export async function fetchPendingNeeds() {
  const supabaseAdmin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data, error } = await supabaseAdmin
    .from("needs")
    .select(`
      *,
      profiles:profile_id (
        id,
        full_name,
        trade_category,
        location_state,
        location_lga
      )
    `)
    .eq("status", "pending_review")
    .order("created_at", { ascending: false })

  if (error) throw new Error(error.message)
  return data || []
}
