# BuildBridge System Architecture (Final — PRD Aligned)

## 1. Purpose
BuildBridge is not a generic crowdfunding platform.

It is a trust-driven economic infrastructure for informal workers, designed to help tradespeople access small amounts of capital through verified identity, community trust, and visible proof of impact.

The system solves a core problem:
Informal workers lack access to funding due to absence of formal financial records, while backers hesitate due to lack of trust.

BuildBridge closes this gap by transforming:
- Identity → Credibility
- Credibility → Funding
- Funding → Measurable Impact
- Impact → Long-term Reputation

---

## 2. Core System Principle

The platform is built on a Progressive Trust Model.

User access, visibility, and funding limits increase as they complete layers of verification and proven impact.

Identity → Trust → Funding → Proof → Reputation → Greater Opportunity

This creates a compounding trust loop.

---

## 3. The BuildBridge Pact

Every Naira pledged must result in visible, verifiable impact.

### Before Funding
- Tradesperson proves identity (NIN/BVN)
- Community validates trust through vouching

### During Funding
- Full transparency of amount, fees, and progress
- Clear visibility of what is being funded

### After Funding
- Mandatory proof-of-use submission
- No need is complete without proof

---

## 4. Trust–Impact Flywheel

User Registration
→ Identity Verification
→ Community Trust Layer
→ Need Creation
→ Funding & Escrow
→ Proof-of-Use Submission
→ Impact Feed / Impact Wall
→ Reputation Increase
→ Higher Badge Level & Funding Limit
→ Repeat Cycle

---

## 5. System Layers

### 5.1 Identity Layer

**Purpose**
Ensure every user is real and prevent duplicates.

**Inputs**
- Phone number
- OTP
- NIN/BVN
- Optional selfie verification

**Process**
1. Phone verification via OTP
2. NIN/BVN submitted
3. Stored as SHA-256 hash
4. Duplicate check

**Rules**
- No plaintext storage
- One identity per user
- Secure private storage

**Outputs**
- user_id
- identity_verified

---

### 5.2 Trust Layer

**Purpose**
Determine credibility beyond identity.

**Components**
- Community vouching
- Leader endorsements
- Badge system
- Geotag verification

**Badge Levels (PRD Aligned)**
- Level 0 – OTP + NIN/BVN verified
- Level 1 – NIN/BVN + 3 vouches
- Level 2 – NIN/BVN + geotagged photo + 5 vouches (including 1 verified business)
- Level 3 – 10 vouches + community leader endorsement
- Level 4 – Selfie face-match + manual review

**Fraud Controls**
- 30-day account age before vouching
- 5 vouches/month limit
- No duplicate vouches
- Graph-based collusion detection

**Outputs**
- trust_score
- badge_level
- funding_limit

---

### 5.3 Need Creation Layer

**Purpose**
Convert needs into structured funding requests.

**Required Fields**
- Item/service
- Cost
- Purpose
- Media
- Deadline
- Category

**AI Support**
- Refines language
- Converts voice to text
- Reframes into economic opportunity

**Rules**
- Must stay within funding limit
- One active need at MVP

---

### 5.4 Funding & Escrow Layer

**Purpose**
Safely convert trust into financial support.

**Payments**
- Local: Paystack
- International: Stripe

**Escrow Logic**
- Funds held by payment partners
- Disbursed at deadline or completion

**Keep-What-You-Raise Model**
- Partial funding still disbursed
- No public failure

**Transparency**
- Fees visible
- Net amount shown

---

### 5.5 Momentum Layer

**Purpose**
Increase visibility of needs.

**Components**
- 48-hour boost
- WhatsApp sharing
- Reminder system

**Logic**
- 24h no pledge → prompt user

---

### 5.6 Proof-of-Use Layer

**Purpose**
Verify funds were used correctly.

**Requirements**
- Photo/video proof
- Optional explanation

**Rules**
- Required for trust progression
- Required for Impact Wall eligibility

---

### 5.7 Impact Layer

**Purpose**
Convert proof into public trust.

**Components**
- Private Impact Feed
- Public Impact Wall

**Impact Wall Criteria**
- Identity verified
- Funding completed
- Proof verified
- User opt-in
- Admin approval

---

### 5.8 Reputation Layer

**Purpose**
Compound trust over time.

**Inputs**
- Completed needs
- Funding totals
- Proof consistency
- Backer return rate

**Outputs**
- reputation_score
- funding_limit increase

---

## 6. Frontend Architecture

**Stack**
- Next.js
- Tailwind

**Principles**
- Mobile-first
- Low literacy support
- Minimal input

**Phase Note**
Offline-first PWA is a future-phase enhancement (not MVP).

---

## 7. Backend Architecture

**Stack**
- Supabase (Postgres, Auth, Storage, Edge Functions)

**Security**
- RLS
- Private/public separation

---

## 8. Messaging & Notifications

**Channels**
- SMS
- WhatsApp
- In-app

**Triggers**
- OTP
- Pledge updates
- Proof reminders

---

## 9. Fraud Prevention

**Controls**
- Rate limiting
- Identity deduplication
- Suspicious pattern detection

---

## 10. Compliance

**NDPR Requirements**
- Consent
- Data protection
- Deletion rights

---

## 11. Information Architecture

**Tradesperson Dashboard**
- Active Need
- Create Need
- Verification Progress
- Proof-of-Use

**Backer Dashboard**
- Needs Backed
- Impact Feed

**Public Surfaces**
- Impact Wall
- How It Works

---

## 12. Final Statement

BuildBridge is a closed-loop trust system where:
- Identity creates accountability
- Trust enables funding
- Funding creates opportunity
- Proof validates outcomes
- Reputation compounds over time

No trust grows without proof.
No funding happens without trust.

