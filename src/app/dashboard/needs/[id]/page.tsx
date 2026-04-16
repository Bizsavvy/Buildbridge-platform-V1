"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { ProgressBar } from "@/components/ui/ProgressBar"
import { Badge } from "@/components/ui/Badge"
import { Card } from "@/components/ui/Card"
import { 
  ChevronLeft, 
  MapPin, 
  Calendar, 
  Users, 
  ShieldCheck, 
  Heart, 
  Share2,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  TrendingUp,
  Award,
  Sparkles,
  Settings
} from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

// Mock data similar to what's in dashboard/page.tsx
const DEMO_NEEDS = [
  {
    id: 'demo-need-1',
    status: 'completed',
    item_name: 'Industrial Sewing Machine',
    item_cost: 35000000,
    funded_amount: 35000000,
    pledge_count: 18,
    photo_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=80&w=800',
    story: "I've been a tailor for 8 years, working with a manual machine. I recently secured a contract to produce school uniforms for three local primary schools. To meet the deadline and quality standards, I need an industrial overlock machine. This will not only speed up my production by 300% but also allow me to hire two apprentices from my community.",
    deadline: new Date().toISOString(),
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    location: "Mushin, Lagos",
    artisan: "Kolawole Segun",
    trade: "Tailor",
    vouch_count: 12
  },
  {
    id: 'demo-need-2',
    status: 'active',
    item_name: 'Fabric Cutting Table',
    item_cost: 15000000,
    funded_amount: 6000000,
    pledge_count: 6,
    photo_url: 'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?auto=format&fit=crop&q=80&w=800',
    story: "As my business grows, I find that cutting fabric on the floor or small tables is slowing me down and causing back pain. A proper industrial-sized cutting table will allow for precision cutting of multiple layers of fabric at once. This is a crucial step in scaling my production for the new contracts I've secured.",
    deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    location: "Mushin, Lagos",
    artisan: "Kolawole Segun",
    trade: "Tailor",
    vouch_count: 12
  }
]

const MOCK_CONTRIBUTORS = [
  { id: 1, name: "Adebayo O.", amount: 500000, date: "2 days ago", avatar: null },
  { id: 2, name: "Chidi E.", amount: 1500000, date: "5 days ago", avatar: null },
  { id: 3, name: "Fatima Z.", amount: 200000, date: "1 week ago", avatar: null },
  { id: 4, name: "Olumide A.", amount: 1000000, date: "1 week ago", avatar: null },
  { id: 5, name: "Anonymous", amount: 300000, date: "2 weeks ago", avatar: null },
]

const MOCK_ACTIVITIES = [
  { id: 1, type: "milestone", title: "Project Fully Funded!", desc: "The community has come together to reach 100% of the goal. Funds are scheduled for disbursement.", date: "1 week ago", icon: CelebrationIcon },
  { id: 2, type: "payment", title: "Pledge Received", desc: "Adebayo O. pledged ₦5,000 to this need.", date: "2 days ago", icon: Heart },
  { id: 3, type: "verification", title: "Proof-of-Use Verified", desc: "The artisan uploaded photographic evidence of the item purchase. Verified by Platform.", date: "4 days ago", icon: ShieldCheck },
  { id: 4, type: "payment", title: "Disbursement Complete", desc: "₦350,000 successfully transferred to the artisan account.", date: "5 days ago", icon: ArrowUpRight },
  { id: 5, type: "milestone", title: "50% Funded", desc: "This need is halfway to its goal! High visibility unlocked in local feeds.", date: "2 weeks ago", icon: TrendingUp },
  { id: 6, type: "vouch", title: "New Vouch Received", desc: "A community leader from Lagos verified this artisan's skills.", date: "3 weeks ago", icon: ShieldCheck },
  { id: 7, type: "created", title: "Need Created", desc: "Kolawole started this journey to expand his tailoring business.", date: "4 weeks ago", icon: Calendar },
]

function CelebrationIcon(props: any) {
  return <Sparkles {...props} className={cn(props.className, "text-yellow-500")} />
}

export default function NeedDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const need = DEMO_NEEDS.find(n => n.id === id) || DEMO_NEEDS[1]
  const percentage = (need.funded_amount / need.item_cost) * 100
  const isCompleted = need.status === 'completed' || percentage >= 100

  if (!need) return null

  return (
    <main className="min-h-screen bg-surface pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation */}
        <button 
           onClick={() => router.back()}
           className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors mb-8 group"
        >
           <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
           Back to Dashboard
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           
           {/* Left Column: Media & Story */}
           <div className="lg:col-span-8 flex flex-col gap-10">
              
              {/* Hero Image */}
              <div className="relative rounded-[3rem] overflow-hidden aspect-video shadow-2xl">
                 <img 
                    src={need.photo_url} 
                    alt={need.item_name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                 
                 <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
                    <div className="flex flex-col gap-2">
                       <div className="flex items-center gap-3">
                          <span className="px-4 py-1.5 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-widest">
                             {need.trade}
                          </span>
                          {isCompleted && (
                             <span className="px-4 py-1.5 rounded-full bg-success text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                                <CheckCircle2 className="h-3 w-3" />
                                Completed
                             </span>
                          )}
                       </div>
                       <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
                          {need.item_name}
                       </h1>
                    </div>
                 </div>
              </div>

              {/* Story Section */}
              <section className="bg-white rounded-[3rem] p-10 shadow-sm border border-outline-variant/30">
                 <div className="flex items-center gap-4 mb-8">
                    <div className="h-10 w-1 bg-primary rounded-full" />
                    <h2 className="text-2xl font-black text-on-surface">The Story</h2>
                 </div>
                 <p className="text-lg text-on-surface-variant leading-relaxed font-medium">
                    {need.story}
                 </p>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 pt-12 border-t border-outline-variant/30">
                    <div className="flex items-start gap-4">
                       <div className="h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                          <MapPin className="h-6 w-6" />
                       </div>
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Location</p>
                          <p className="text-base font-bold text-on-surface">{need.location}</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-4">
                       <div className="h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                          <Calendar className="h-6 w-6" />
                       </div>
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Deadline</p>
                          <p className="text-base font-bold text-on-surface">{new Date(need.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                       </div>
                    </div>
                 </div>
              </section>

              {/* Detailed Specs & Impact Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-outline-variant/30">
                    <h3 className="text-lg font-black text-on-surface mb-6 flex items-center gap-2">
                       <Settings className="h-5 w-5 text-primary" />
                       Item Specifications
                    </h3>
                    <div className="space-y-4">
                       {[
                         { label: "Make/Model", val: "Butterfly Industrial S5" },
                         { label: "Power Type", val: "Electric (Servo Motor)" },
                         { label: "Stitch Speed", val: "5,000 spm" },
                         { label: "Warranty", val: "12 Months (Local Partner)" }
                       ].map(spec => (
                          <div key={spec.label} className="flex justify-between items-center py-2 border-b border-outline-variant/10">
                             <span className="text-xs font-bold text-on-surface-variant/60">{spec.label}</span>
                             <span className="text-xs font-black text-on-surface">{spec.val}</span>
                          </div>
                       ))}
                    </div>
                 </section>

                 <section className="bg-primary/5 rounded-[2.5rem] p-8 shadow-sm border border-primary/10">
                    <h3 className="text-lg font-black text-on-surface mb-6 flex items-center gap-2">
                       <TrendingUp className="h-5 w-5 text-primary" />
                       Projected Impact
                    </h3>
                    <div className="space-y-4">
                       <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                             <Users className="h-4 w-4" />
                          </div>
                          <p className="text-sm font-bold text-on-surface-variant">3 New Apprentices Hired</p>
                       </div>
                       <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                             <ArrowUpRight className="h-4 w-4" />
                          </div>
                          <p className="text-sm font-bold text-on-surface-variant">40% Increase in Family Income</p>
                       </div>
                       <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                             <Heart className="h-4 w-4" />
                          </div>
                          <p className="text-sm font-bold text-on-surface-variant">Community Uniforms Access</p>
                       </div>
                    </div>
                 </section>
              </div>

              {/* Activity Timeline */}
              <section className="flex flex-col gap-8 bg-white rounded-[3rem] p-10 border border-outline-variant/30">
                 <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black text-on-surface flex items-center gap-3">
                       <Clock className="h-6 w-6 text-primary" />
                       Activity History
                    </h2>
                 </div>
                 
                 <div className="flex flex-col gap-8 pl-4 relative">
                    <div className="absolute left-[31px] top-4 bottom-4 w-0.5 bg-outline-variant/30" />
                    
                    {MOCK_ACTIVITIES.map((activity, idx) => (
                       <motion.div 
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          key={`${activity.id}-${idx}`} 
                          className="flex gap-6 relative group"
                       >
                          <div className={cn(
                             "h-10 w-10 rounded-full flex items-center justify-center z-10 shrink-0 transition-transform group-hover:scale-110 shadow-lg border-4 border-white",
                             activity.type === 'milestone' ? "bg-primary text-white" : 
                             activity.type === 'verification' ? "bg-success text-white" :
                             "bg-surface-variant/20 text-on-surface-variant"
                          )}>
                             <activity.icon className="h-4 w-4" />
                          </div>
                          <div className="flex flex-col gap-1 pt-1">
                             <div className="flex items-center gap-3">
                                <h4 className="text-sm font-black text-on-surface uppercase tracking-wide">{activity.title}</h4>
                                <span className="text-[10px] font-bold text-on-surface-variant/40">{activity.date}</span>
                             </div>
                             <p className="text-sm text-on-surface-variant font-medium">{activity.desc}</p>
                          </div>
                       </motion.div>
                    ))}
                 </div>
              </section>

           </div>

           {/* Right Column: Funding & artisan Info */}
           <div className="lg:col-span-4 flex flex-col gap-8">
              
              <div className="sticky top-24 flex flex-col gap-8">
                 {/* Funding Card */}
                 <Card className="p-8 bg-white border border-outline-variant/30 shadow-2xl rounded-[3rem]">
                    <div className="flex flex-col gap-8">
                       
                       <div className="flex flex-col gap-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-primary">Progress Target</span>
                          <div className="flex items-baseline gap-2">
                             <span className="text-4xl font-black text-on-surface">₦{new Intl.NumberFormat().format(need.funded_amount / 100)}</span>
                             <span className="text-xs font-bold text-on-surface-variant">raised</span>
                          </div>
                          <p className="text-sm font-bold text-on-surface-variant">out of ₦{new Intl.NumberFormat().format(need.item_cost / 100)}</p>
                       </div>

                       <div className="space-y-4">
                          <div className="flex justify-between items-end">
                             <span className="text-xs font-black text-on-surface uppercase tracking-widest">{Math.min(100, Math.round(percentage))}% complete</span>
                             <span className="text-xs font-bold text-on-surface-variant">{need.pledge_count} Backers</span>
                          </div>
                          <ProgressBar percentage={percentage} className="h-4 bg-surface-variant/20 shadow-inner" />
                       </div>

                       <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 rounded-3xl bg-surface-variant/20 border border-white flex flex-col gap-1">
                             <Users className="h-4 w-4 text-primary mb-1" />
                             <span className="text-xl font-black text-on-surface">{need.pledge_count}</span>
                             <span className="text-[10px] font-black uppercase text-on-surface-variant tracking-wider">Supporters</span>
                          </div>
                          <div className="p-4 rounded-3xl bg-surface-variant/20 border border-white flex flex-col gap-1">
                             <Award className="h-4 w-4 text-primary mb-1" />
                             <span className="text-xl font-black text-on-surface">{need.vouch_count}</span>
                             <span className="text-[10px] font-black uppercase text-on-surface-variant tracking-wider">Vouches</span>
                          </div>
                       </div>

                       <Button 
                          className={cn(
                             "w-full h-16 rounded-[2rem] text-lg font-black shadow-xl transition-all hover:scale-[1.02]",
                             isCompleted ? "bg-success text-white shadow-success/20" : "bg-primary text-white shadow-primary/20"
                          )}
                          disabled={isCompleted}
                       >
                          {isCompleted ? (
                             <span className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5" />
                                Successfully Funded
                             </span>
                          ) : (
                             "Pledge Support Now"
                          )}
                       </Button>

                       <div className="flex items-center justify-between pt-4 border-t border-outline-variant/30">
                          <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">
                             <Share2 className="h-4 w-4" />
                             Share Progress
                          </button>
                          <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">
                             <ShieldCheck className="h-4 w-4" />
                             Trust Assurance
                          </button>
                       </div>
                    </div>
                 </Card>

                 {/* Artisan Profile Card */}
                 <Card className="p-8 bg-surface-variant/10 border border-outline-variant/10 rounded-[3rem]">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant mb-6 text-center">About the Artisan</p>
                    <div className="flex flex-col items-center gap-4 text-center">
                       <div className="relative">
                          <img 
                             src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" 
                             alt={need.artisan}
                             className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-xl"
                          />
                          <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-2 border-2 border-white text-white">
                             <ShieldCheck className="h-4 w-4" />
                          </div>
                       </div>
                       <div>
                          <h3 className="text-xl font-black text-on-surface">{need.artisan}</h3>
                          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">{need.trade}</p>
                          <p className="text-xs text-on-surface-variant font-medium leading-relaxed px-4">
                             Top-rated tailor in Mushin with 100% project delivery rate.
                          </p>
                       </div>
                       
                       <Button variant="ghost" className="w-full h-12 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white mt-4 border border-outline-variant/10">
                          View Full Profile
                          <ArrowUpRight className="h-3 w-3 ml-2" />
                       </Button>
                    </div>
                 </Card>

                 {/* Recent Contributors */}
                 <div className="flex flex-col gap-4">
                    <h3 className="text-title-medium font-black text-on-surface px-2">Top Supporters</h3>
                    <div className="flex flex-col gap-3">
                       {MOCK_CONTRIBUTORS.slice(0, 3).map(backer => (
                          <div key={backer.id} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-outline-variant/10 shadow-sm">
                             <div className="h-8 w-8 rounded-full bg-primary/5 flex items-center justify-center text-primary font-black text-[10px]">
                                {backer.name.charAt(0)}
                             </div>
                             <div className="flex-grow">
                                <p className="text-[11px] font-black text-on-surface leading-tight">{backer.name}</p>
                                <p className="text-[9px] font-bold text-on-surface-variant/40">{backer.date}</p>
                             </div>
                             <div className="text-right font-black text-xs text-on-surface">
                                ₦{new Intl.NumberFormat().format(backer.amount / 100)}
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>

           </div>

        </div>

      </div>
    </main>
  )
}
