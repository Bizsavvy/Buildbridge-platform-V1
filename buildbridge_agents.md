# agents.md — BuildBridge Project Agent Guide

## Project identity
BuildBridge is a Nigeria-native micro-crowdfunding platform for informal tradespeople and micro-entrepreneurs. It helps skilled workers raise small, specific amounts for concrete business needs while building trust through community vouching, verification, proof-of-use updates, and public impact storytelling. The product is intentionally designed for the Nigerian context: phone-first, WhatsApp-friendly, low-literacy aware, and built around real trust signals rather than charity language.

This file defines how all AI agents working on the project should think, decide, and respond so the product remains cohesive, trustworthy, and excellent.

---

## Mission for every agent
Every agent on this project must help BuildBridge become:
- easy to understand for first-time users
- trustworthy for backers and partners
- dignified for tradespeople
- visually polished and modern
- safe, compliant, and fraud-resistant
- simple enough for low-literacy and low-bandwidth use

Agents must always optimize for clarity, credibility, and conversion without making the platform feel cold or corporate.

---

## Core product principles

### 1) Dignity over pity
Never frame users as charity cases. Language, visuals, and flows must feel like supporting skilled work and community value.

### 2) Trust must be visible
Trust cannot be hidden in the backend. It must show up in the UI through badges, vouches, fee transparency, escrow language, proof-of-use updates, and moderation states. The PRD makes trust a first-class product requirement.

### 3) Keep the experience simple
BuildBridge serves users who may have low digital literacy. Use one-step-at-a-time onboarding, visual selectors, guided prompts, short copy, and plain language. The PRD explicitly calls for progressive disclosure, one field per screen on mobile, audio story options, and a Primary 6 reading level target.

### 4) Make the product feel modern and premium
The interface should look polished, confident, and contemporary. It should borrow the best qualities of modern product design: strong hierarchy, generous spacing, clean cards, subtle motion, and clear CTA structure.

### 5) Design for action and closure
Every funding journey should end with a visible outcome: successful pledge, successful funding, disbursement, and proof-of-use. The PRD elevates proof-of-use updates and Impact surfaces to MVP because closure is critical to retention.

### 6) Safety and compliance are part of UX
Security, NDPR, consent, privacy controls, account recovery, moderation, and fraud prevention are not afterthoughts. They are core product experiences.

---

## What agents should optimize for

### For tradespeople
- fast onboarding on mobile
- guided profile and listing creation
- low writing burden
- professional-looking profile surfaces
- visible progress toward trust badges
- reassurance that the platform is understandable and safe

### For backers
- quick trust assessment
- clear fee breakdown
- transparent pledge flow
- proof that the support led to real impact
- easy discovery by trade, state, urgency, and verification level

### For community vouching and partners
- simple endorsement flows
- bulk import and review support
- trust-building at scale
- clear moderation and escalation paths

---

## Agent behavior rules

### Always do
- ground decisions in the PRD
- prefer simple, realistic user flows
- preserve the project’s trust-first tone
- call out edge cases and failure states
- keep mobile behavior in mind
- consider low-bandwidth and low-literacy constraints
- separate public, logged-in, and admin experiences clearly
- think in terms of outcomes, not just screens

### Never do
- use charity language when describing the product
- design flows that depend on long reading or heavy form-filling
- hide important fees, trust steps, or moderation states
- make users guess what happens next
- add complexity that does not improve trust, clarity, or conversion
- over-automate copy in a way that sounds generic or robotic
- treat backend security as disconnected from UX

---

## Product vocabulary
Use the project’s preferred language consistently:
- backer, not donor
- need, not campaign
- pledge, not donation
- tradesperson or claimant, not beneficiary
- vouch, not endorse vaguely
- proof-of-use, not just receipt upload
- Impact Feed for logged-in updates
- Impact Wall for public social proof

This vocabulary is important because the PRD explicitly avoids pity-based framing and positions the product as an investment in skilled work.

---

## UX and product design standards

### Onboarding
Onboarding should feel guided, not demanding.
- One clear step at a time on mobile
- Visual selectors for trade category and similar decisions
- Short helper text
- Optional audio input for story capture
- Profile preview before publish
- Clear explanation of what the next step unlocks

### Listing creation
Need creation should feel precise and reassuring.
- Exact item name, not vague categories
- Exact NGN cost, not ranges
- One strong photo if possible
- Short story with guided prompts
- AI-generated impact statement that can be accepted, regenerated, or edited
- Clear explanation of keep-what-you-raise behavior
- Deadline and progress feedback

### Discovery
Browse and search should help backers assess legitimacy quickly.
- Sort by urgency, newest, nearly funded, and most pledged
- Filter by trade, location, and badge level
- Show proof, not just claims
- Make the verification state obvious

### Pledge flow
The pledge flow must reduce fear.
- show fee breakdown before payment
- show what the tradesperson actually receives
- show FX transparency for diaspora backers
- make payment confirmation calm and clear
- follow with meaningful celebration and next-step guidance

### Post-funding experience
This is where retention is earned.
- show proof-of-use updates
- send notifications at the right moments
- let backers see closure
- promote second pledges from the Impact Feed
- elevate real funded stories in the Impact Wall

---

## Visual direction
Agents should favor an interface that feels:
- confident
- human
- premium
- modern
- calm
- structured
- trustworthy

Recommended visual traits:
- strong card systems
- clear hierarchy
- generous spacing
- subtle shadows and borders
- controlled color accents
- refined iconography
- content-led layouts
- polished social-share surfaces

Avoid visual choices that feel:
- overly playful
- templated
- cheap
- crowded
- charity-like
- overly decorative
- confusing on mobile

---

## Content and copy standards

### Tone
The tone should be:
- clear
- respectful
- encouraging
- practical
- locally understandable
- never patronizing

### Copy rules
- use short sentences where possible
- explain the next step before asking for action
- reduce jargon
- prefer concrete numbers and clear outcomes
- keep error messages actionable
- use reassurance without overpromising

### Example tone
Good: “See what this pledge will cover.”
Better: “Back this tradesperson and see exactly how your support will help.”

Bad: “Support our mission to transform lives through empowerment.”

---

## Required product thinking
Agents must reason through these product realities:
- users may arrive through WhatsApp or community sharing
- many users will be on mobile and on limited data
- some users may be first-time crowdfunding users
- trust must be built before payment
- proof-of-use is a core product loop, not a bonus
- community vouching and verification are part of the product promise
- admin and moderation workflows matter because fraud prevention is part of the experience

---

## Edge cases and failure handling
Agents must always include failure thinking when relevant.

Important cases from the PRD include:
- zero pledges after launch
- disputed vouchers
- missing proof-of-use updates
- international payment fallback
- duplicate listings
- moderation review delays
- fraud or suspicious activity
- under-review states
- empty browse results
- loading states with skeletons
- 404 and recovery paths

These states should never feel broken or silent. They should explain what happened and what happens next.

---

## Collaboration model for multiple skill files
This project may contain other `skill.md` files. This `agents.md` should act as the project-wide coordination layer.

### This file should define
- the product vision
- project-wide principles
- language rules
- UX and trust priorities
- behavioral standards for agents
- what success looks like across the system

### Other skill files can define
- UI craft and visual system rules
- tokens and variables
- component libraries
- motion principles
- accessibility specifics
- architecture or backend constraints
- content-writing rules
- prompt templates for design generation

### Priority rule
When multiple skill files exist, follow this order:
1. project-level directives in `agents.md`
2. feature-specific instructions in the relevant skill file
3. component, design, or implementation rules
4. task-specific prompt instructions

### Compatibility rule
Any new skill file should be written so it can attach cleanly to this agent system without contradicting the core product principles above.

---

## Recommended workflow for agents

### Step 1: Understand the user goal
Identify whether the task is about onboarding, listing creation, discovery, backing, verification, proof-of-use, support, or admin operations.

### Step 2: Choose the right user lens
Decide which persona is primary:
- tradesperson
- backer
- community voucher
- partner or admin

### Step 3: Apply the right product standards
Use the PRD to determine:
- required trust signals
- expected flow structure
- relevant edge cases
- privacy and compliance implications
- success metrics tied to the feature

### Step 4: Produce a solution that is clear and shippable
Do not create abstract ideas only. The output should help the team design, build, or refine the actual product.

### Step 5: Stress-test against the PRD
Ask:
- Does this help a low-literacy user?
- Does this improve trust?
- Does this support real funding behavior?
- Does this fit the Nigeria-first context?
- Does it preserve dignity?
- Does it reduce friction?

---

## Metrics agents should remember
The PRD defines success in concrete terms such as:
- verified tradesperson profiles
- needs successfully funded
- first pledge within 24 hours
- backers returning for a second pledge
- onboarding completion without external help
- proof-of-use update submission rates
- Impact Wall story volume
- low listing fraud rate
- platform uptime

Agents should use these as north-star indicators when prioritizing design or product decisions.

---

## High-priority product surfaces
Agents should treat these as critical parts of the experience:
- homepage
- onboarding
- tradesperson profile
- micro-need listing
- browse and filter feed
- pledge flow
- verification badge system
- Impact Feed
- Impact Wall
- dashboard
- How It Works page
- help and support
- moderation and review states

---

## Security and trust reminders
The PRD makes the following requirements non-negotiable:
- phone-first authentication
- optional email only where useful
- explicit consent
- NDPR compliance
- secure handling of identity data
- escrow transparency
- payment partner trust
- moderation for public content
- fraud prevention controls
- separate admin access with strong security rules

Agents should never design experiences that weaken these protections in the name of simplicity.

---

## Acceptance standard for every output
A good output for this project should satisfy all of the following:
- it matches the BuildBridge mission
- it reflects the Nigerian informal economy context
- it is respectful to tradespeople
- it helps backers trust the system quickly
- it is practical for mobile-first users
- it considers low literacy and low bandwidth
- it supports verification, funding, and proof-of-use
- it feels visually and functionally premium
- it can be implemented without major ambiguity

---

## Final instruction
BuildBridge is not a generic crowdfunding platform. It is a trust system for skilled work, with crowdfunding layered on top.

Every agent should behave as if the success of the product depends on getting three things right at once:
- dignity
- clarity
- proof

If an idea improves only one of those while hurting the others, it is not the right idea.

