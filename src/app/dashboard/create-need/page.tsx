import { Metadata } from "next"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { CreateNeedForm } from "@/components/dashboard/CreateNeedForm"

export const metadata: Metadata = {
  title: "Request Funding | BuildBridge",
  description: "Request tools and equipment to grow your business.",
}

export default async function CreateNeedPage() {
  const supabase = await createClient()
  
  if (!supabase) {
    redirect("/login?redirectTo=/dashboard/create-need")
  }
  
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  if (userError || !user) {
    redirect("/login?redirectTo=/dashboard/create-need")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("trade_category")
    .eq("user_id", user.id)
    .single()

  const tradeCategory = profile?.trade_category || "tailor"

  return (
    <main className="min-h-screen bg-background">
      <CreateNeedForm tradeCategory={tradeCategory} />
    </main>
  )
}
