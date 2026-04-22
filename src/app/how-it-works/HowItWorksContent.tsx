"use client";

import React, { useState } from "react";
import { 
  ClipboardEdit, 
  Users, 
  Wallet, 
  Camera, 
  ShieldCheck,
  FileBadge,
  UserCheck,
  Receipt,
  Image as ImageIcon,
  ArrowRight,
  Sparkles,
  ArrowLeft
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function HowItWorksContent() {
  const [activeTrustIndex, setActiveTrustIndex] = useState(0);

  const lifecycleSteps = [
    {
      number: "01",
      icon: ClipboardEdit,
      title: "Define Your Need",
      description: "Submit a request for specific business tools or equipment. No vague loans—just what you need to work.",
      example: "Amina, a tailor, requests an Industrial Overlock Machine for ₦350,000 to fulfill school uniform contracts.",
      color: "text-blue-600",
      bgColor: "bg-blue-500/10"
    },
    {
      number: "02",
      icon: Users,
      title: "Community Vouching",
      description: "Local associations and verified peers vouch for your skill and character. This builds your Trust Score.",
      example: "The Surulere Tailors Association and 8 local peers vouch for Amina's reliability and craftsmanship.",
      color: "text-purple-600",
      bgColor: "bg-purple-500/10"
    },
    {
      number: "03",
      icon: Wallet,
      title: "Get Backed",
      description: "Backers contribute to your need. Funds are held securely in escrow until you are ready to purchase.",
      example: "14 backers from around the world contribute to Amina's need until the ₦350,000 goal is met.",
      color: "text-green-600",
      bgColor: "bg-green-500/10"
    },
    {
      number: "04",
      icon: Camera,
      title: "Share Your Proof",
      description: "Buy your tools, upload proof-of-use, and share your growth story. This completes the trust circle.",
      example: "Amina purchases the machine, uploads a photo of her using it, and unlocks a Level 2 badge for future needs.",
      color: "text-orange-600",
      bgColor: "bg-orange-500/10"
    }
  ];

  const trustStack = [
    {
      title: "NIN / BVN Verification",
      icon: FileBadge,
      description: "Every tradesperson undergoes strict identity verification via national databases to ensure they are who they say they are."
    },
    {
      title: "Market Association Vouching",
      icon: Users,
      description: "We partner with local market associations and guilds who act as offline guarantors for their members."
    },
    {
      title: "Peer Recommendations",
      icon: UserCheck,
      description: "Established tradespeople on the platform can vouch for newcomers, putting their own reputation on the line."
    },
    {
      title: "Verified Purchases",
      icon: Receipt,
      description: "Funds are either sent directly to vetted equipment vendors or require strict receipt validation."
    },
    {
      title: "Proof of Use",
      icon: ImageIcon,
      description: "Tradespeople upload photos and videos of the funded equipment in action, closing the transparency loop."
    }
  ];

  return (
    <div className="min-h-screen relative" style={{ background: 'var(--color-surface)' }}>
      {/* Decorative blobs */}
      <div className="absolute top-1/4 left-0 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 -translate-y-1/2 translate-x-1/2 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Hero Section styled like the image */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-start text-left relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" className="flex items-center gap-2 text-primary -ml-4 hover:bg-primary/5">
                <ArrowLeft size={18} />
                Back to Hub
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-2 text-[#4c3e82] uppercase text-xs sm:text-sm font-bold tracking-widest mb-6">
            <Sparkles className="w-4 h-4" />
            4 SIMPLE STEPS TO GET FUNDED
          </div>
          
          <h1 className="text-6xl md:text-[5rem] leading-[1.1] font-black mb-8 tracking-tight text-[#1a1a1a]">
            How it <span className="text-[#5b4d96] italic relative inline-block whitespace-nowrap">
              Works.
              <span className="absolute bottom-2 left-0 w-full h-[6px] md:h-2 bg-[#ffb900] -z-10"></span>
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-[#333333] max-w-2xl font-medium leading-relaxed">
            BuildBridge isn't just about money—it's about building a reputation that unlocks growth. Every pledge is held in escrow and only deployed once goals are reached.
          </p>
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-5xl mx-auto glass-card p-6 sm:p-12 rounded-[2.5rem] shadow-premium"
        >
          <div className="space-y-24">
            
            {/* Storytelling Lifecycle Timeline */}
            <div className="space-y-16 relative">
              {/* Vertical connecting line */}
              <div className="absolute left-[2.25rem] md:left-1/2 top-8 bottom-8 w-px bg-outline-variant/50 hidden sm:block -z-10" />

              {lifecycleSteps.map((step, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className={`flex flex-col md:flex-row gap-8 md:gap-16 items-start ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    {/* Content Side */}
                    <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'} w-full`}>
                      <div className="flex items-center gap-4 mb-4 md:hidden">
                        <div className={`w-12 h-12 rounded-2xl ${step.bgColor} ${step.color} flex items-center justify-center shrink-0`}>
                          <step.icon size={24} />
                        </div>
                        <span className="text-display-small font-black text-primary/20">{step.number}</span>
                      </div>
                      
                      <h3 className="text-headline-small font-bold text-on-surface mb-3">
                        {step.title}
                      </h3>
                      <p className="text-on-surface-variant leading-relaxed text-lg mb-6">
                        {step.description}
                      </p>
                    </div>

                    {/* Center Node */}
                    <div className="hidden md:flex flex-col items-center justify-start relative z-10 shrink-0">
                      <div className={`w-16 h-16 rounded-3xl ${step.bgColor} ${step.color} flex items-center justify-center shadow-sm border border-white/20 backdrop-blur-sm`}>
                        <step.icon size={28} />
                      </div>
                    </div>

                    {/* Example Side */}
                    <div className="flex-1 w-full mt-4 md:mt-0">
                      <div className={`p-6 rounded-3xl bg-surface-container border border-outline-variant/30 relative ${isEven ? 'md:rounded-tl-none' : 'md:rounded-tr-none'}`}>
                        <div className="text-sm font-bold uppercase tracking-widest text-primary mb-2">Real Example</div>
                        <p className="text-on-surface italic leading-relaxed">
                          "{step.example}"
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Interactive Trust Stack */}
            <section className="bg-primary/5 rounded-[3rem] p-8 sm:p-12 border border-primary/10 overflow-hidden relative">
              <div className="text-center max-w-2xl mx-auto mb-12 relative z-10">
                <h2 className="text-display-small text-on-surface font-bold mb-4">The Trust Stack</h2>
                <p className="text-on-surface-variant text-lg">
                  We use five layers of verification to ensure every need is real. Select a layer to understand how we protect backers.
                </p>
              </div>

              <div className="flex flex-col lg:flex-row gap-12 items-center relative z-10">
                {/* Interactive List */}
                <div className="w-full lg:w-1/2 space-y-3">
                  {trustStack.map((item, index) => {
                    const isActive = activeTrustIndex === index;
                    return (
                      <button
                        key={index}
                        onClick={() => setActiveTrustIndex(index)}
                        className={`w-full text-left p-5 rounded-2xl transition-all duration-300 flex items-center gap-4 border ${
                          isActive 
                            ? "bg-white shadow-premium border-primary/20 scale-[1.02]" 
                            : "hover:bg-white/50 border-transparent text-on-surface-variant"
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isActive ? "bg-primary/10 text-primary" : "bg-outline-variant/20 text-on-surface-variant"
                        }`}>
                          <item.icon size={20} />
                        </div>
                        <span className={`font-bold text-lg ${isActive ? "text-on-surface" : ""}`}>
                          {item.title}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Dynamic Display Area */}
                <div className="w-full lg:w-1/2 flex justify-center">
                  <div className="w-full max-w-sm aspect-square bg-white rounded-[3rem] p-8 shadow-premium border border-outline-variant/30 flex flex-col items-center justify-center text-center relative overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTrustIndex}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col items-center"
                      >
                        {(() => {
                          const ActiveIcon = trustStack[activeTrustIndex].icon;
                          return (
                            <div className="w-24 h-24 rounded-3xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                              <ActiveIcon size={48} strokeWidth={1.5} />
                            </div>
                          );
                        })()}
                        <h4 className="text-headline-small font-bold text-on-surface mb-4">
                          {trustStack[activeTrustIndex].title}
                        </h4>
                        <p className="text-on-surface-variant text-lg leading-relaxed">
                          {trustStack[activeTrustIndex].description}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                    
                    {/* Background decorative ring */}
                    <div className="absolute inset-0 border-[40px] border-primary/5 rounded-[3rem] pointer-events-none scale-150" />
                  </div>
                </div>
              </div>
            </section>

            {/* Final CTA Strip */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 sm:p-12 rounded-[2.5rem] bg-gradient-to-br from-surface-container to-surface-container-high border border-outline-variant/50 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="absolute -right-24 -top-24 w-72 h-72 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute -left-24 -bottom-24 w-72 h-72 bg-tertiary/10 rounded-full blur-[80px] pointer-events-none" />
              
              <div className="text-center md:text-left relative z-10 max-w-xl">
                <h4 className="text-3xl md:text-4xl font-black text-on-surface mb-3 tracking-tight">Ready to start?</h4>
                <p className="text-lg text-on-surface-variant font-medium leading-relaxed">Choose your path and build with us today. Whether you're seeking funding or looking to back a tradesperson.</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 relative z-10 shrink-0">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link href="/signup" className="block w-full">
                    <Button variant="outline" size="lg" className="rounded-full w-full sm:w-auto text-base px-8 font-bold border-2 hover:bg-primary/5 transition-colors whitespace-nowrap">
                      Get Vouched
                    </Button>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link href="/browse" className="block w-full">
                    <Button size="lg" className="rounded-full flex items-center justify-center gap-2 w-full sm:w-auto text-base px-8 font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap">
                      Back a Need <ArrowRight size={18} className="ml-1" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </section>
    </div>
  );
}
