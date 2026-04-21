"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { User, Mail, Briefcase, Calendar, MapPin, Camera, Edit2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const [user, setUser] = React.useState<any>(null);
  const [profile, setProfile] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const supabase = createClient();

  React.useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle();
        setProfile(data);
      }
      setIsLoading(false);
    };
    fetchProfile();
  }, [supabase]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-8 animate-pulse space-y-8">
        <div className="h-48 w-full bg-surface-variant/30 rounded-[2.5rem]" />
        <div className="h-96 w-full bg-surface-variant/20 rounded-[2.5rem]" />
      </div>
    );
  }

  const initial = profile?.full_name?.charAt(0) || user?.email?.charAt(0) || "U";

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8 space-y-8">
      {/* Hero Profile Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-64 sm:h-80 rounded-[3rem] overflow-hidden bg-primary shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80" />
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        
        <div className="absolute -bottom-1 left-0 right-0 p-8 flex flex-col sm:flex-row items-end gap-6 text-white">
          <div className="relative group">
            <div className="w-32 h-32 sm:w-40 h-40 rounded-[2.5rem] bg-white text-primary flex items-center justify-center text-5xl font-black border-8 border-primary shadow-2xl">
              {initial.toUpperCase()}
            </div>
            <button className="absolute bottom-2 right-2 p-2 bg-yellow-400 text-black rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all">
              <Camera className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-grow pb-4">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight">{profile?.full_name || "Artisan"}</h1>
            <p className="opacity-80 font-bold uppercase tracking-widest text-xs mt-1 flex items-center gap-2">
              <Briefcase className="w-3 h-3" />
              {profile?.trade_category || "Member"}
            </p>
          </div>

          <Button className="mb-4 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 gap-2">
            <Edit2 className="w-4 h-4" />
            Edit Profile
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar Info */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <Card className="p-8 rounded-[2rem] border-outline-variant/30 space-y-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-on-surface-variant/60">Contact Information</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 group">
                <div className="p-3 rounded-2xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Email</p>
                  <p className="text-sm font-bold text-on-surface">{user?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="p-3 rounded-2xl bg-secondary/5 text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Joined</p>
                  <p className="text-sm font-bold text-on-surface">
                    {new Date(user?.created_at).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="p-3 rounded-2xl bg-tertiary/5 text-tertiary group-hover:bg-tertiary group-hover:text-white transition-all">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Location</p>
                  <p className="text-sm font-bold text-on-surface">Nigeria</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Main Content Areas */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 space-y-8"
        >
          <Card className="p-10 rounded-[2.5rem] border-outline-variant/30 bg-surface relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                <User className="w-64 h-64" />
             </div>
             
             <div className="relative z-10 space-y-6">
                <h2 className="text-3xl font-black text-on-surface">About Me</h2>
                <p className="text-lg text-on-surface-variant leading-relaxed font-medium">
                  {profile?.bio || `Professional ${profile?.trade_category || 'Artisan'} dedicated to high-quality work and community impact. Let's build something amazing together.`}
                </p>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                  {[
                    { label: "Verified", value: "Level 1" },
                    { label: "Impact", value: "0 Projects" },
                    { label: "Rating", value: "New" },
                  ].map((stat, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-surface-variant/20 border border-outline-variant/30">
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">{stat.label}</p>
                      <p className="text-lg font-black text-on-surface">{stat.value}</p>
                    </div>
                  ))}
                </div>
             </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <Card className="p-8 rounded-[2rem] border-outline-variant/30 group hover:border-primary/30 transition-all cursor-pointer">
                <h3 className="text-xl font-black text-on-surface mb-2">My Gallery</h3>
                <p className="text-sm text-on-surface-variant font-medium mb-4">Showcase your best work to the community.</p>
                <div className="h-40 rounded-2xl bg-surface-variant/10 border-2 border-dashed border-outline-variant/50 flex items-center justify-center text-on-surface-variant font-bold">
                  + Add Photos
                </div>
             </Card>

             <Card className="p-8 rounded-[2rem] border-outline-variant/30 group hover:border-secondary/30 transition-all cursor-pointer">
                <h3 className="text-xl font-black text-on-surface mb-2">Impact Wall</h3>
                <p className="text-sm text-on-surface-variant font-medium mb-4">Stories of lives changed through your work.</p>
                <div className="h-40 rounded-2xl bg-surface-variant/10 border-2 border-dashed border-outline-variant/50 flex items-center justify-center text-on-surface-variant font-bold">
                  No stories yet
                </div>
             </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
