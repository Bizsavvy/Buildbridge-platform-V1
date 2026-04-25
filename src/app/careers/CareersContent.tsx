"use client";

import React from "react";
import { PremiumPageLayout } from "@/components/layout/PremiumPageLayout";
import { 
  Briefcase, 
  Sparkles, 
  Coffee, 
  Map, 
  Zap,
  ArrowRight,
  TrendingUp,
  Heart
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function CareersContent() {
  const roles = [
    {
      title: "Senior Product Engineer",
      team: "Engineering",
      location: "Remote / Lagos",
      type: "Full-time"
    },
    {
      title: "Partnerships Manager",
      team: "Growth",
      location: "Lagos / Field",
      type: "Full-time"
    },
    {
      title: "Community Field Officer",
      team: "Operations",
      location: "Kano / Abuja / PH",
      type: "Contract"
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "User Dignity",
      description: "We build for artisans with the respect they deserve."
    },
    {
      icon: Zap,
      title: "Extreme Speed",
      description: "We move fast to bridge financial gaps when they matter."
    },
    {
      icon: TrendingUp,
      title: "Local Excellence",
      description: "We solve Nigerian problems with world-class engineering."
    }
  ];

  const perks = [
    "Remote-First",
    "Equity Options",
    "Health Cover",
    "Paid Sabbaticals",
    "Learning Budget",
    "Co-working Access",
    "Team Retreats",
    "Flexible Hours"
  ];

  return (
    <PremiumPageLayout
      eyebrow="JOIN OUR TEAM"
      titlePlain="Build for the"
      titleAccent="Next Billion."
      subtitle="We are reimagining trust and financial access for the informal economy. Join us on our mission to unlock growth for millions."
    >
      <div className="space-y-20">
        {/* Intro Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4"
            style={{ background: 'var(--color-primary-container)', color: 'var(--color-on-primary-container)' }}
          >
            WHY BUILDBRIDGE
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4" style={{ color: 'var(--color-on-surface)' }}>Why BuildBridge?</h2>
          <p className="text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto" style={{ color: 'var(--color-on-surface-variant)' }}>
            Working at BuildBridge means solving real-world trust gaps using state-of-the-art technology. 
            We are an impact-first company building tools for those who build our world.
          </p>
        </motion.section>

        {/* Culture / Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {values.map((v, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               whileHover={{ y: -4 }}
               className="p-8 rounded-[1.5rem] border border-outline-variant/30 flex flex-col items-center text-center transition-shadow hover:shadow-md"
               style={{ background: 'var(--color-surface-container)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}
             >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                   <v.icon size={24} />
                </div>
                <h4 className="text-lg md:text-xl font-black tracking-tight mb-3" style={{ color: 'var(--color-on-surface)' }}>{v.title}</h4>
                <p className="text-sm font-medium leading-relaxed" style={{ color: 'var(--color-on-surface-variant)' }}>{v.description}</p>
             </motion.div>
           ))}
        </div>

        {/* Roles Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-10">
             <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
               <Sparkles className="text-primary" size={20} />
             </div>
             <h3 className="text-2xl md:text-3xl font-black tracking-tight" style={{ color: 'var(--color-on-surface)' }}>Open Roles</h3>
          </div>

           <div className="space-y-4">
              {roles.map((role, index) => (
                 <motion.div
                   key={index}
                   whileHover={{ x: 6 }}
                   className="p-6 rounded-[1.5rem] border border-outline-variant/30 hover:border-primary/30 transition-all flex flex-col sm:flex-row items-center justify-between gap-6 group"
                   style={{ background: 'var(--color-surface-container)', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}
                 >
                    <div className="text-center sm:text-left">
                       <h4 className="text-lg font-black tracking-tight group-hover:text-primary transition-colors" style={{ color: 'var(--color-on-surface)' }}>{role.title}</h4>
                       <div className="flex gap-4 mt-2 text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--color-on-surface-variant)' }}>
                          <span className="flex items-center gap-1"><Coffee size={12} /> {role.team}</span>
                          <span className="flex items-center gap-1"><Map size={12} /> {role.location}</span>
                          <span className="text-primary">{role.type}</span>
                       </div>
                    </div>
                    <Button variant="ghost" className="rounded-full group-hover:bg-primary group-hover:text-white transition-all font-black text-sm">
                       Apply Now <ArrowRight size={16} className="ml-2" />
                    </Button>
                 </motion.div>
              ))}
           </div>
           
           <p className="mt-8 text-center text-sm font-medium" style={{ color: 'var(--color-on-surface-variant)' }}>
             Don&apos;t see a role that fits? <a href="mailto:careers@buildbridge.africa" className="text-primary font-black hover:underline">Send us a general application</a>.
           </p>
        </motion.section>

        {/* Perks Grid */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[2rem] p-8 sm:p-12 border border-primary/10"
          style={{ background: 'var(--color-primary-container)' }}
        >
           <h3 className="text-xl md:text-2xl font-black tracking-tight mb-8" style={{ color: 'var(--color-on-primary-container)' }}>Life at BuildBridge</h3>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {perks.map((perk, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  className="p-4 rounded-2xl bg-white border border-outline-variant/30 text-center text-sm font-black tracking-tight cursor-default"
                  style={{ color: 'var(--color-on-surface)', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}
                >
                   {perk}
                </motion.div>
              ))}
           </div>
        </motion.section>
      </div>
    </PremiumPageLayout>
  );
}
