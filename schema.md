# BuildBridge Database Schema

**Platform:** Supabase (PostgreSQL 15+)  
**Security:** Row-Level Security (RLS) enabled on all tables  
**Encryption:** AES-256 at rest, TLS 1.3 in transit  
**Version:** 1.0.0 (MVP)

---

## Table of Contents

1. [Custom Types and Enums](#custom-types-and-enums)
2. [Core Tables](#core-tables)
3. [Relationships and Foreign Keys](#relationships-and-foreign-keys)
4. [Indexes](#indexes)
5. [Row-Level Security Policies](#row-level-security-policies)
6. [Triggers and Functions](#triggers-and-functions)
7. [Data Retention and Compliance](#data-retention-and-compliance)

---

## Custom Types and Enums

```sql
-- User roles
CREATE TYPE user_role AS ENUM (
  'tradesperson',
  'backer',
  'community_leader',
  'admin'
);

-- Trade categories
CREATE TYPE trade_category AS ENUM (
  'tailor',
  'carpenter',
  'welder',
  'cobbler',
  'food_processor',
  'market_trader',
  'baker',
  'mechanic',
  'electrician',
  'plumber',
  'hair_stylist',
  'blacksmith',
  'other'
);

-- Badge/verification levels
CREATE TYPE badge_level AS ENUM (
  'level_0_unverified',
  'level_1_community_member',
  'level_2_trusted_tradesperson',
  'level_3_established',
  'level_4_platform_verified'
);

-- Need/listing status
CREATE TYPE need_status AS ENUM (
  'draft',
  'pending_review',
  'active',
  'funded',
  'completed',
  'expired',
  'rejected',
  'flagged'
);

-- Verification provider
CREATE TYPE verification_provider AS ENUM (
  'dojah',
  'prembly',
  'manual'
);

-- Notification channels
CREATE TYPE notification_channel AS ENUM (
  'sms',
  'whatsapp',
  'email'
);

-- Notification types
CREATE TYPE notification_type AS ENUM (
  'pledge_received',
  'first_pledge_celebration',
  'milestone_50',
  'milestone_80',
  'milestone_100',
  'proof_nudge_day3',
  'proof_nudge_day7',
  'proof_nudge_day14',
  'proof_submitted',
  'zero_pledge_24h',
  'disbursement_complete',
  'vouch_received',
  'need_approved',
  'need_rejected',
  'account_flagged'
);

-- Relationship types for vouching
CREATE TYPE relationship_type AS ENUM (
  'customer',
  'neighbor',
  'market_colleague',
  'apprentice_master',
  'family',
  'cooperative_member',
  'association_member',
  'other'
);

-- Moderation statuses
CREATE TYPE moderation_status AS ENUM (
  'pending',
  'approved',
  'rejected',
  'revision_requested',
  'flagged_fraud'
);

-- Share card formats
CREATE TYPE share_card_format AS ENUM (
  'whatsapp_16_9',
  'instagram_9_16',
  'twitter_2_1',
  'facebook_1_91_1'
);

-- Report reasons
CREATE TYPE report_reason AS ENUM (
  'fake_identity',
  'duplicate_listing',
  'fraudulent_vouch',
  'inappropriate_content',
  'stock_photo',
  'false_information',
  'spam',
  'other'
);

-- Nigerian states (subset - expand as needed)
CREATE TYPE nigerian_state AS ENUM (
  'lagos',
  'oyo',
  'anambra',
  'rivers',
  'kano',
  'kaduna',
  'abuja_fct',
  'ogun',
  'enugu',
  'delta',
  'edo',
  'imo',
  'kwara',
  'osun',
  'ondo',
  'abia',
  'ekiti',
  'plateau',
  'bayelsa',
  'cross_river'
  -- Add more states as platform expands
);
```

---

## Core Tables

### 1. `users`

**Purpose:** Core authentication and account table. Phone-first registration with optional email.

```sql
CREATE TABLE users (
  -- Primary identification
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Authentication (phone is mandatory, email optional)
  phone VARCHAR(20) NOT NULL UNIQUE,
  phone_verified_at TIMESTAMPTZ,
  email VARCHAR(255) UNIQUE,
  email_verified_at TIMESTAMPTZ,
  
  -- Basic profile
  name VARCHAR(255) NOT NULL,
  role user_role NOT NULL DEFAULT 'tradesperson',
  
  -- Security
  password_hash TEXT, -- Optional: some users may be OTP-only
  last_login_at TIMESTAMPTZ,
  last_login_ip INET,
  failed_login_attempts INTEGER DEFAULT 0,
  account_locked_until TIMESTAMPTZ,
  two_factor_enabled BOOLEAN DEFAULT FALSE,
  
  -- Account status
  is_active BOOLEAN DEFAULT TRUE,
  is_suspended BOOLEAN DEFAULT FALSE,
  suspension_reason TEXT,
  suspended_at TIMESTAMPTZ,
  suspended_by UUID REFERENCES users(id),
  
  -- Privacy and compliance
  data_deletion_requested_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ, -- Soft delete for NDPR compliance
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT valid_phone CHECK (phone ~ '^\+?[0-9]{10,15}$'),
  CONSTRAINT valid_email CHECK (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' OR email IS NULL),
  CONSTRAINT phone_verified_when_registered CHECK (phone_verified_at IS NOT NULL)
);

-- Indexes
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_email ON users(email) WHERE email IS NOT NULL;
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_created_at ON users(created_at);
CREATE INDEX idx_users_active ON users(is_active) WHERE is_active = TRUE;
```

---

### 2. `profiles`

**Purpose:** Tradesperson and backer profile details. One profile per user.

```sql
CREATE TABLE profiles (
  -- Primary identification
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  
  -- Trade information (nullable for backers)
  trade_category trade_category,
  trade_other_description VARCHAR(100), -- Used when trade_category = 'other'
  years_experience INTEGER CHECK (years_experience >= 0 AND years_experience <= 80),
  apprentices_trained INTEGER DEFAULT 0 CHECK (apprentices_trained >= 0),
  certifications TEXT[], -- Array of certification names
  
  -- Location (required for tradespeople, optional for backers)
  location_lga VARCHAR(100),
  location_state nigerian_state,
  location_latitude DECIMAL(10, 8), -- For geotagging verification
  location_longitude DECIMAL(11, 8),
  
  -- Profile content
  story TEXT CHECK (char_length(story) <= 300), -- Max 300 words as per PRD
  photo_url TEXT,
  photo_uploaded_at TIMESTAMPTZ,
  
  -- Verification and trust
  badge_level badge_level DEFAULT 'level_0_unverified',
  badge_updated_at TIMESTAMPTZ,
  delivered_count INTEGER DEFAULT 0, -- Count of completed needs with proof
  vouch_count INTEGER DEFAULT 0, -- Cached count for performance
  
  -- Privacy settings
  contact_info_visible BOOLEAN DEFAULT TRUE,
  pledge_history_visible BOOLEAN DEFAULT TRUE,
  vouch_details_visible BOOLEAN DEFAULT TRUE,
  income_visible BOOLEAN DEFAULT FALSE, -- Hide income implied by need amounts
  
  -- Fraud and trust scoring
  trust_score DECIMAL(3, 2) DEFAULT 1.00 CHECK (trust_score >= 0 AND trust_score <= 1.00),
  fraud_flags INTEGER DEFAULT 0,
  last_fraud_review_at TIMESTAMPTZ,
  
  -- Notification preferences
  notify_via_sms BOOLEAN DEFAULT TRUE,
  notify_via_whatsapp BOOLEAN DEFAULT TRUE,
  notify_via_email BOOLEAN DEFAULT FALSE,
  
  -- Account restrictions
  can_vouch BOOLEAN DEFAULT FALSE, -- Enabled after 30 days
  vouching_suspended_until TIMESTAMPTZ,
  can_create_needs BOOLEAN DEFAULT TRUE,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT tradesperson_requires_trade CHECK (
    (trade_category IS NOT NULL AND location_lga IS NOT NULL AND location_state IS NOT NULL)
    OR user_id IN (SELECT id FROM users WHERE role != 'tradesperson')
  ),
  CONSTRAINT valid_coordinates CHECK (
    (location_latitude BETWEEN -90 AND 90 AND location_longitude BETWEEN -180 AND 180)
    OR (location_latitude IS NULL AND location_longitude IS NULL)
  )
);

-- Indexes
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_profiles_trade_category ON profiles(trade_category);
CREATE INDEX idx_profiles_location_state ON profiles(location_state);
CREATE INDEX idx_profiles_badge_level ON profiles(badge_level);
CREATE INDEX idx_profiles_trust_score ON profiles(trust_score);
CREATE INDEX idx_profiles_can_vouch ON profiles(can_vouch) WHERE can_vouch = TRUE;
CREATE INDEX idx_profiles_location_geo ON profiles USING gist(ll_to_earth(location_latitude, location_longitude)) WHERE location_latitude IS NOT NULL;
```

---

### 3. `needs`

**Purpose:** Funding requests (micro-needs/listings) created by tradespeople.

```sql
CREATE TABLE needs (
  -- Primary identification
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Need details
  item_name VARCHAR(200) NOT NULL,
  item_cost DECIMAL(12, 2) NOT NULL CHECK (item_cost > 0 AND item_cost <= 1000000), -- Max NGN 1M
  photo_url TEXT NOT NULL,
  photo_geotag_lat DECIMAL(10, 8),
  photo_geotag_lng DECIMAL(11, 8),
  photo_uploaded_at TIMESTAMPTZ,
  
  -- Story and impact
  story TEXT NOT NULL CHECK (char_length(story) <= 150), -- Max 150 words as per PRD
  impact_statement TEXT CHECK (char_length(impact_statement) <= 200),
  impact_statement_source VARCHAR(20) DEFAULT 'ai_generated', -- 'ai_generated' | 'manual' | 'edited'
  
  -- Campaign timeline
  deadline DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  expired_at TIMESTAMPTZ,
  
  -- Status and moderation
  status need_status DEFAULT 'draft',
  moderation_notes TEXT,
  moderated_by UUID REFERENCES users(id),
  moderated_at TIMESTAMPTZ,
  rejection_reason TEXT,
  
  -- Funding tracking
  funded_amount DECIMAL(12, 2) DEFAULT 0 CHECK (funded_amount >= 0),
  pledge_count INTEGER DEFAULT 0 CHECK (pledge_count >= 0),
  funding_percentage DECIMAL(5, 2) GENERATED ALWAYS AS ((funded_amount / item_cost) * 100) STORED,
  
  -- Disbursement
  disbursed_at TIMESTAMPTZ,
  disbursement_amount DECIMAL(12, 2),
  disbursement_reference VARCHAR(100),
  
  -- Proof of use
  proof_photo_url TEXT,
  proof_video_url TEXT,
  proof_caption TEXT CHECK (char_length(proof_caption) <= 300),
  proof_submitted_at TIMESTAMPTZ,
  proof_nudge_count INTEGER DEFAULT 0,
  last_proof_nudge_at TIMESTAMPTZ,
  
  -- Visibility and promotion
  visibility_boost_until TIMESTAMPTZ, -- 48-hour boost window
  featured BOOLEAN DEFAULT FALSE,
  featured_until TIMESTAMPTZ,
  
  -- Fraud detection
  reverse_image_search_flagged BOOLEAN DEFAULT FALSE,
  duplicate_detection_flagged BOOLEAN DEFAULT FALSE,
  
  -- Metadata
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT valid_deadline CHECK (deadline >= CURRENT_DATE AND deadline <= CURRENT_DATE + INTERVAL '30 days'),
  CONSTRAINT valid_geotag CHECK (
    (photo_geotag_lat BETWEEN -90 AND 90 AND photo_geotag_lng BETWEEN -180 AND 180)
    OR (photo_geotag_lat IS NULL AND photo_geotag_lng IS NULL)
  ),
  CONSTRAINT proof_requires_completion CHECK (
    (status = 'completed' AND proof_submitted_at IS NOT NULL)
    OR status != 'completed'
  ),
  CONSTRAINT funded_amount_not_exceeds_cost CHECK (funded_amount <= item_cost * 1.1) -- Allow 10% overfunding
);

-- Indexes
CREATE INDEX idx_needs_profile_id ON needs(profile_id);
CREATE INDEX idx_needs_status ON needs(status);
CREATE INDEX idx_needs_deadline ON needs(deadline);
CREATE INDEX idx_needs_created_at ON needs(created_at DESC);
CREATE INDEX idx_needs_funding_percentage ON needs(funding_percentage);
CREATE INDEX idx_needs_active ON needs(status) WHERE status = 'active';
CREATE INDEX idx_needs_visibility_boost ON needs(visibility_boost_until) WHERE visibility_boost_until > NOW();
CREATE INDEX idx_needs_proof_pending ON needs(status, proof_submitted_at) WHERE status = 'funded' AND proof_submitted_at IS NULL;
CREATE UNIQUE INDEX idx_needs_one_active_per_profile ON needs(profile_id) WHERE status IN ('active', 'pending_review');
```

---

### 4. `pledges`

**Purpose:** Backer contributions to needs. Records all pledge details and fees.

```sql
CREATE TABLE pledges (
  -- Primary identification
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  need_id UUID NOT NULL REFERENCES needs(id) ON DELETE CASCADE,
  backer_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Pledge details
  amount DECIMAL(12, 2) NOT NULL CHECK (amount > 0),
  currency VARCHAR(3) DEFAULT 'NGN',
  
  -- Fee breakdown (stored as JSON for transparency)
  fee_breakdown_json JSONB NOT NULL, -- { platform_fee: X, processing_fee: Y, tradesperson_receives: Z }
  
  -- Payment tracking
  payment_provider VARCHAR(20), -- 'paystack' | 'stripe'
  payment_reference VARCHAR(100) UNIQUE,
  payment_status VARCHAR(20) DEFAULT 'pending', -- 'pending' | 'completed' | 'failed' | 'refunded'
  paid_at TIMESTAMPTZ,
  
  -- International pledge handling
  original_currency VARCHAR(3), -- For diaspora backers
  original_amount DECIMAL(12, 2),
  exchange_rate DECIMAL(10, 6),
  
  -- Backer message
  message TEXT CHECK (char_length(message) <= 500),
  
  -- Contact reveal (backer gets tradesperson contact after pledge)
  contact_revealed_at TIMESTAMPTZ,
  
  -- Disbursement tracking
  disbursed_to_tradesperson BOOLEAN DEFAULT FALSE,
  disbursed_at TIMESTAMPTZ,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT valid_fee_breakdown CHECK (
    jsonb_typeof(fee_breakdown_json) = 'object' AND
    (fee_breakdown_json->>'platform_fee')::DECIMAL >= 0 AND
    (fee_breakdown_json->>'processing_fee')::DECIMAL >= 0 AND
    (fee_breakdown_json->>'tradesperson_receives')::DECIMAL > 0
  ),
  CONSTRAINT international_pledge_complete CHECK (
    (original_currency IS NOT NULL AND original_amount IS NOT NULL AND exchange_rate IS NOT NULL)
    OR original_currency IS NULL
  )
);

-- Indexes
CREATE INDEX idx_pledges_need_id ON pledges(need_id);
CREATE INDEX idx_pledges_backer_user_id ON pledges(backer_user_id);
CREATE INDEX idx_pledges_created_at ON pledges(created_at DESC);
CREATE INDEX idx_pledges_payment_status ON pledges(payment_status);
CREATE INDEX idx_pledges_payment_reference ON pledges(payment_reference);
CREATE INDEX idx_pledges_disbursed ON pledges(disbursed_to_tradesperson) WHERE disbursed_to_tradesperson = FALSE;
```

---

### 5. `vouches`

**Purpose:** Community vouching system for trust building. Critical for badge progression.

```sql
CREATE TABLE vouches (
  -- Primary identification
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  voucher_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  recipient_profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Vouch details
  relationship_type relationship_type NOT NULL,
  relationship_duration_years INTEGER CHECK (relationship_duration_years >= 0 AND relationship_duration_years <= 50),
  statement TEXT NOT NULL CHECK (char_length(statement) >= 20 AND char_length(statement) <= 300),
  
  -- Trust weighting
  vouch_weight DECIMAL(3, 2) DEFAULT 1.00, -- Community leaders get higher weight (5.00)
  is_community_leader_vouch BOOLEAN DEFAULT FALSE,
  
  -- Status and moderation
  status moderation_status DEFAULT 'approved',
  disputed BOOLEAN DEFAULT FALSE,
  dispute_reason TEXT,
  disputed_at TIMESTAMPTZ,
  
  -- Fraud detection
  flagged_as_fraud BOOLEAN DEFAULT FALSE,
  fraud_review_notes TEXT,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT no_self_vouch CHECK (
    voucher_user_id != (SELECT user_id FROM profiles WHERE id = recipient_profile_id)
  ),
  CONSTRAINT unique_vouch UNIQUE (voucher_user_id, recipient_profile_id)
);

-- Indexes
CREATE INDEX idx_vouches_voucher_user_id ON vouches(voucher_user_id);
CREATE INDEX idx_vouches_recipient_profile_id ON vouches(recipient_profile_id);
CREATE INDEX idx_vouches_created_at ON vouches(created_at DESC);
CREATE INDEX idx_vouches_status ON vouches(status);
CREATE INDEX idx_vouches_flagged ON vouches(flagged_as_fraud) WHERE flagged_as_fraud = TRUE;
CREATE INDEX idx_vouches_community_leader ON vouches(is_community_leader_vouch) WHERE is_community_leader_vouch = TRUE;
```

---

### 6. `verifications`

**Purpose:** NIN/BVN verification records. Critical security table with hashed PII.

```sql
CREATE TABLE verifications (
  -- Primary identification
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Identity verification (HASHED - never store plaintext)
  nin_hash VARCHAR(64), -- SHA-256 hash of NIN
  bvn_hash VARCHAR(64), -- SHA-256 hash of BVN
  nin_verified_at TIMESTAMPTZ,
  bvn_verified_at TIMESTAMPTZ,
  
  -- Selfie face match (for Level 4)
  selfie_url TEXT, -- Stored temporarily, deleted after verification
  selfie_match_score DECIMAL(3, 2) CHECK (selfie_match_score >= 0 AND selfie_match_score <= 1.00),
  selfie_matched_at TIMESTAMPTZ,
  
  -- Verification provider
  provider verification_provider NOT NULL,
  provider_reference VARCHAR(100),
  provider_response_json JSONB, -- Full API response for audit
  
  -- Status
  verified BOOLEAN DEFAULT FALSE,
  verification_failed BOOLEAN DEFAULT FALSE,
  failure_reason TEXT,
  
  -- Manual review (for Level 4 and disputes)
  manual_review_required BOOLEAN DEFAULT FALSE,
  manual_review_completed BOOLEAN DEFAULT FALSE,
  reviewed_by UUID REFERENCES users(id),
  review_notes TEXT,
  reviewed_at TIMESTAMPTZ,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT nin_or_bvn_required CHECK (nin_hash IS NOT NULL OR bvn_hash IS NOT NULL),
  CONSTRAINT verified_requires_hash CHECK (
    (verified = TRUE AND (nin_hash IS NOT NULL OR bvn_hash IS NOT NULL))
    OR verified = FALSE
  )
);

-- Indexes
CREATE INDEX idx_verifications_profile_id ON verifications(profile_id);
CREATE INDEX idx_verifications_nin_hash ON verifications(nin_hash) WHERE nin_hash IS NOT NULL;
CREATE INDEX idx_verifications_bvn_hash ON verifications(bvn_hash) WHERE bvn_hash IS NOT NULL;
CREATE INDEX idx_verifications_verified ON verifications(verified);
CREATE INDEX idx_verifications_manual_review ON verifications(manual_review_required) WHERE manual_review_required = TRUE;
CREATE UNIQUE INDEX idx_verifications_unique_nin ON verifications(nin_hash) WHERE nin_hash IS NOT NULL;
CREATE UNIQUE INDEX idx_verifications_unique_bvn ON verifications(bvn_hash) WHERE bvn_hash IS NOT NULL;
```

---

### 7. `impact_wall_submissions`

**Purpose:** Public showcase submissions with moderation queue. Separate from proof-of-use updates.

```sql
CREATE TABLE impact_wall_submissions (
  -- Primary identification
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  need_id UUID NOT NULL UNIQUE REFERENCES needs(id) ON DELETE CASCADE,
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Content
  photo_url TEXT,
  video_url TEXT,
  video_thumbnail_url TEXT,
  caption TEXT NOT NULL CHECK (char_length(caption) >= 20 AND char_length(caption) <= 500),
  
  -- Opt-in and consent
  opted_in_at TIMESTAMPTZ NOT NULL,
  public_display_consent BOOLEAN DEFAULT TRUE,
  
  -- Moderation
  moderation_status moderation_status DEFAULT 'pending',
  moderated_by UUID REFERENCES users(id),
  moderation_notes TEXT,
  moderated_at TIMESTAMPTZ,
  
  -- Publication
  published_at TIMESTAMPTZ,
  unpublished_at TIMESTAMPTZ,
  featured BOOLEAN DEFAULT FALSE,
  featured_until TIMESTAMPTZ,
  
  -- Engagement metrics
  view_count INTEGER DEFAULT 0,
  share_count INTEGER DEFAULT 0,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT media_required CHECK (photo_url IS NOT NULL OR video_url IS NOT NULL),
  CONSTRAINT published_requires_approval CHECK (
    (published_at IS NOT NULL AND moderation_status = 'approved')
    OR published_at IS NULL
  )
);

-- Indexes
CREATE INDEX idx_impact_wall_need_id ON impact_wall_submissions(need_id);
CREATE INDEX idx_impact_wall_profile_id ON impact_wall_submissions(profile_id);
CREATE INDEX idx_impact_wall_moderation_status ON impact_wall_submissions(moderation_status);
CREATE INDEX idx_impact_wall_published ON impact_wall_submissions(published_at DESC) WHERE published_at IS NOT NULL;
CREATE INDEX idx_impact_wall_featured ON impact_wall_submissions(featured, featured_until) WHERE featured = TRUE;
```

---

### 8. `notifications`

**Purpose:** Multi-channel notification log and delivery tracking.

```sql
CREATE TABLE notifications (
  -- Primary identification
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Notification details
  type notification_type NOT NULL,
  channel notification_channel NOT NULL,
  
  -- Content
  message TEXT NOT NULL,
  message_data JSONB, -- Structured data for templating (e.g., { need_id, amount, tradesperson_name })
  
  -- Related entities
  need_id UUID REFERENCES needs(id) ON DELETE SET NULL,
  pledge_id UUID REFERENCES pledges(id) ON DELETE SET NULL,
  
  -- Delivery status
  sent BOOLEAN DEFAULT FALSE,
  sent_at TIMESTAMPTZ,
  delivered BOOLEAN DEFAULT FALSE,
  delivered_at TIMESTAMPTZ,
  failed BOOLEAN DEFAULT FALSE,
  failure_reason TEXT,
  
  -- Provider tracking
  provider_reference VARCHAR(100), -- Twilio/Termii/SendGrid message ID
  provider_response_json JSONB,
  
  -- User interaction
  read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMPTZ,
  clicked BOOLEAN DEFAULT FALSE,
  clicked_at TIMESTAMPTZ,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT delivered_requires_sent CHECK (
    (delivered = TRUE AND sent = TRUE)
    OR delivered = FALSE
  )
);

-- Indexes
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_type ON notifications(type);
CREATE INDEX idx_notifications_channel ON notifications(channel);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);
CREATE INDEX idx_notifications_unread ON notifications(user_id, read) WHERE read = FALSE;
CREATE INDEX idx_notifications_failed ON notifications(failed) WHERE failed = TRUE;
CREATE INDEX idx_notifications_need_id ON notifications(need_id) WHERE need_id IS NOT NULL;
```

---

### 9. `milestones`

**Purpose:** Track 50%, 80%, 100% funding milestones for automated notifications.

```sql
CREATE TABLE milestones (
  -- Primary identification
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  need_id UUID NOT NULL REFERENCES needs(id) ON DELETE CASCADE,
  
  -- Milestone tracking
  milestone_pct INTEGER NOT NULL CHECK (milestone_pct IN (50, 80, 100)),
  triggered_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Notification tracking
  backers_notified BOOLEAN DEFAULT FALSE,
  backers_notified_at TIMESTAMPTZ,
  notification_count INTEGER DEFAULT 0,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT unique_milestone UNIQUE (need_id, milestone_pct)
);

-- Indexes
CREATE INDEX idx_milestones_need_id ON milestones(need_id);
CREATE INDEX idx_milestones_triggered_at ON milestones(triggered_at);
CREATE INDEX idx_milestones_pending_notification ON milestones(backers_notified) WHERE backers_notified = FALSE;
```

---

### 10. `share_cards`

**Purpose:** Auto-generated social media share cards with tracking.

```sql
CREATE TABLE share_cards (
  -- Primary identification
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  need_id UUID NOT NULL REFERENCES needs(id) ON DELETE CASCADE,
  
  -- Card details
  format share_card_format NOT NULL,
  image_url TEXT NOT NULL,
  
  -- Generation metadata
  generated_at TIMESTAMPTZ DEFAULT NOW(),
  generator_version VARCHAR(10) DEFAULT '1.0',
  
  -- Usage tracking
  download_count INTEGER DEFAULT 0,
  share_count INTEGER DEFAULT 0,
  last_shared_at TIMESTAMPTZ,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT unique_card UNIQUE (need_id, format)
);

-- Indexes
CREATE INDEX idx_share_cards_need_id ON share_cards(need_id);
CREATE INDEX idx_share_cards_format ON share_cards(format);
CREATE INDEX idx_share_cards_created_at ON share_cards(created_at DESC);
```

---

### 11. `reports`

**Purpose:** User-submitted reports and moderation queue.

```sql
CREATE TABLE reports (
  -- Primary identification
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Reported entity
  need_id UUID REFERENCES needs(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  vouch_id UUID REFERENCES vouches(id) ON DELETE CASCADE,
  
  -- Report details
  reason report_reason NOT NULL,
  description TEXT CHECK (char_length(description) >= 10 AND char_length(description) <= 1000),
  evidence_urls TEXT[], -- Screenshots, links, etc.
  
  -- Moderation
  status moderation_status DEFAULT 'pending',
  reviewed_by UUID REFERENCES users(id),
  review_notes TEXT,
  reviewed_at TIMESTAMPTZ,
  
  -- Resolution
  action_taken TEXT,
  resolved_at TIMESTAMPTZ,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT entity_required CHECK (
    need_id IS NOT NULL OR profile_id IS NOT NULL OR vouch_id IS NOT NULL
  )
);

-- Indexes
CREATE INDEX idx_reports_reporter_user_id ON reports(reporter_user_id);
CREATE INDEX idx_reports_need_id ON reports(need_id) WHERE need_id IS NOT NULL;
CREATE INDEX idx_reports_profile_id ON reports(profile_id) WHERE profile_id IS NOT NULL;
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_pending ON reports(status, created_at) WHERE status = 'pending';
CREATE INDEX idx_reports_created_at ON reports(created_at DESC);
```

---

### 12. `vouch_velocity_tracking`

**Purpose:** Fraud prevention - track vouching velocity per user.

```sql
CREATE TABLE vouch_velocity_tracking (
  -- Primary identification
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Tracking window
  month_year VARCHAR(7) NOT NULL, -- Format: 'YYYY-MM'
  vouches_given_count INTEGER DEFAULT 0 CHECK (vouches_given_count >= 0),
  
  -- Limits
  limit_exceeded BOOLEAN DEFAULT FALSE,
  limit_exceeded_at TIMESTAMPTZ,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT unique_user_month UNIQUE (user_id, month_year),
  CONSTRAINT valid_month_format CHECK (month_year ~ '^\d{4}-\d{2}$')
);

-- Indexes
CREATE INDEX idx_vouch_velocity_user_id ON vouch_velocity_tracking(user_id);
CREATE INDEX idx_vouch_velocity_month_year ON vouch_velocity_tracking(month_year);
CREATE INDEX idx_vouch_velocity_exceeded ON vouch_velocity_tracking(limit_exceeded) WHERE limit_exceeded = TRUE;
```

---

### 13. `community_leader_endorsements`

**Purpose:** Track community leader endorsements (weighted vouches).

```sql
CREATE TABLE community_leader_endorsements (
  -- Primary identification
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  leader_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Leader credentials
  organization_name VARCHAR(255) NOT NULL,
  organization_type VARCHAR(100), -- 'market_association' | 'cooperative' | 'cda' | 'ngo'
  position VARCHAR(100), -- 'chairman' | 'secretary' | 'elder'
  verification_document_url TEXT,
  
  -- Endorsement details
  endorsement_statement TEXT NOT NULL CHECK (char_length(endorsement_statement) >= 50),
  member_count INTEGER CHECK (member_count > 0), -- Size of represented community
  
  -- Status
  verified BOOLEAN DEFAULT FALSE,
  verified_by UUID REFERENCES users(id),
  verified_at TIMESTAMPTZ,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT unique_leader_profile UNIQUE (leader_user_id, profile_id)
);

-- Indexes
CREATE INDEX idx_endorsements_leader_user_id ON community_leader_endorsements(leader_user_id);
CREATE INDEX idx_endorsements_profile_id ON community_leader_endorsements(profile_id);
CREATE INDEX idx_endorsements_verified ON community_leader_endorsements(verified);
CREATE INDEX idx_endorsements_created_at ON community_leader_endorsements(created_at DESC);
```

---

### 14. `audit_log`

**Purpose:** System-wide audit trail for compliance and debugging.

```sql
CREATE TABLE audit_log (
  -- Primary identification
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Actor
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  admin_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  
  -- Action details
  action VARCHAR(100) NOT NULL, -- 'need_created' | 'pledge_made' | 'vouch_given' | 'account_suspended'
  entity_type VARCHAR(50), -- 'user' | 'profile' | 'need' | 'pledge' | 'vouch'
  entity_id UUID,
  
  -- Context
  ip_address INET,
  user_agent TEXT,
  request_metadata JSONB,
  
  -- Changes
  old_values JSONB,
  new_values JSONB,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_audit_log_user_id ON audit_log(user_id) WHERE user_id IS NOT NULL;
CREATE INDEX idx_audit_log_action ON audit_log(action);
CREATE INDEX idx_audit_log_entity ON audit_log(entity_type, entity_id);
CREATE INDEX idx_audit_log_created_at ON audit_log(created_at DESC);
CREATE INDEX idx_audit_log_admin_actions ON audit_log(admin_user_id, created_at DESC) WHERE admin_user_id IS NOT NULL;
```

---

### 15. `fraud_detection_events`

**Purpose:** Track fraud detection signals and patterns.

```sql
CREATE TABLE fraud_detection_events (
  -- Primary identification
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Related entities
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  need_id UUID REFERENCES needs(id) ON DELETE CASCADE,
  vouch_id UUID REFERENCES vouches(id) ON DELETE CASCADE,
  
  -- Detection details
  event_type VARCHAR(50) NOT NULL, -- 'closed_loop_vouch' | 'stock_photo_detected' | 'duplicate_listing' | 'rapid_vouching'
  severity VARCHAR(20) DEFAULT 'low', -- 'low' | 'medium' | 'high' | 'critical'
  confidence_score DECIMAL(3, 2) CHECK (confidence_score >= 0 AND confidence_score <= 1.00),
  
  -- Evidence
  evidence_json JSONB,
  detection_method VARCHAR(100), -- 'network_graph_analysis' | 'reverse_image_search' | 'geolocation_mismatch'
  
  -- Review status
  reviewed BOOLEAN DEFAULT FALSE,
  reviewed_by UUID REFERENCES users(id),
  reviewed_at TIMESTAMPTZ,
  false_positive BOOLEAN DEFAULT FALSE,
  
  -- Action taken
  action_taken TEXT,
  action_taken_at TIMESTAMPTZ,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_fraud_events_user_id ON fraud_detection_events(user_id) WHERE user_id IS NOT NULL;
CREATE INDEX idx_fraud_events_need_id ON fraud_detection_events(need_id) WHERE need_id IS NOT NULL;
CREATE INDEX idx_fraud_events_severity ON fraud_detection_events(severity);
CREATE INDEX idx_fraud_events_unreviewed ON fraud_detection_events(reviewed, created_at) WHERE reviewed = FALSE;
CREATE INDEX idx_fraud_events_created_at ON fraud_detection_events(created_at DESC);
```

---

## Relationships and Foreign Keys

### Primary Relationships

```
users (1) ←→ (1) profiles
  └─ One user has one profile

profiles (1) ←→ (N) needs
  └─ One profile creates many needs

needs (1) ←→ (N) pledges
  └─ One need receives many pledges

users (1) ←→ (N) pledges [as backer]
  └─ One user makes many pledges

profiles (1) ←→ (N) vouches [as recipient]
  └─ One profile receives many vouches

users (1) ←→ (N) vouches [as voucher]
  └─ One user gives many vouches

profiles (1) ←→ (1) verifications
  └─ One profile has one verification record

needs (1) ←→ (1) impact_wall_submissions
  └─ One need has at most one Impact Wall submission

needs (1) ←→ (N) milestones
  └─ One need has multiple milestones (50%, 80%, 100%)

needs (1) ←→ (N) share_cards
  └─ One need has multiple share card formats
```

### Cascade Rules

- **ON DELETE CASCADE**: When a parent record is deleted, child records are automatically deleted
  - `users → profiles` (delete user → delete profile)
  - `profiles → needs` (delete profile → delete needs)
  - `needs → pledges` (delete need → delete pledges)
  - `needs → milestones` (delete need → delete milestones)

- **ON DELETE SET NULL**: When a parent record is deleted, FK is set to NULL
  - `users → audit_log.user_id` (preserve audit trail)
  - `needs → notifications.need_id` (preserve notification history)

---

## Indexes

### Performance Optimization Strategy

**Index Rationale:**
- **Browse/Discovery**: Indexes on `status`, `trade_category`, `location_state`, `created_at` for need listing queries
- **User lookups**: Unique indexes on `phone`, `email` for authentication
- **Fraud detection**: Indexes on `nin_hash`, `bvn_hash` for duplicate prevention
- **Moderation queues**: Partial indexes on `status = 'pending'` for admin workflows
- **Notification delivery**: Indexes on `user_id`, `read = FALSE` for unread counts
- **Geospatial**: GiST index on location coordinates for proximity queries

### Composite Indexes

```sql
-- Active needs by location and trade for discovery
CREATE INDEX idx_needs_active_location_trade 
ON needs(location_state, trade_category, created_at DESC) 
WHERE status = 'active';

-- Backer pledge history with need status
CREATE INDEX idx_pledges_backer_need_status 
ON pledges(backer_user_id, created_at DESC) 
INCLUDE (need_id, amount);

-- Vouch count aggregation
CREATE INDEX idx_vouches_recipient_approved 
ON vouches(recipient_profile_id, status) 
WHERE status = 'approved';

-- Proof-of-use nudge targeting
CREATE INDEX idx_needs_proof_nudge_target 
ON needs(status, proof_submitted_at, deadline) 
WHERE status = 'funded' AND proof_submitted_at IS NULL;
```

---

## Row-Level Security Policies

### Security Model

**Principle:** Users can only access their own data unless explicitly permitted.

### 1. `users` Table

```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Users can read their own record
CREATE POLICY "users_select_own" ON users
  FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own record (excluding role and security fields)
CREATE POLICY "users_update_own" ON users
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id AND
    role = (SELECT role FROM users WHERE id = auth.uid()) -- Cannot change own role
  );

-- Admins can read all users
CREATE POLICY "users_select_admin" ON users
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can update any user
CREATE POLICY "users_update_admin" ON users
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

---

### 2. `profiles` Table

```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Anyone can read public profiles
CREATE POLICY "profiles_select_public" ON profiles
  FOR SELECT
  USING (TRUE);

-- Users can update their own profile
CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE
  USING (user_id = auth.uid());

-- Users can insert their own profile
CREATE POLICY "profiles_insert_own" ON profiles
  FOR INSERT
  WITH CHECK (user_id = auth.uid());
```

---

### 3. `needs` Table

```sql
ALTER TABLE needs ENABLE ROW LEVEL SECURITY;

-- Anyone can read active/completed needs
CREATE POLICY "needs_select_public" ON needs
  FOR SELECT
  USING (status IN ('active', 'completed', 'funded'));

-- Tradespeople can read their own needs (all statuses)
CREATE POLICY "needs_select_own" ON needs
  FOR SELECT
  USING (
    profile_id IN (
      SELECT id FROM profiles WHERE user_id = auth.uid()
    )
  );

-- Tradespeople can create needs
CREATE POLICY "needs_insert_own" ON needs
  FOR INSERT
  WITH CHECK (
    profile_id IN (
      SELECT id FROM profiles WHERE user_id = auth.uid()
    )
  );

-- Tradespeople can update their own needs (before approval only)
CREATE POLICY "needs_update_own" ON needs
  FOR UPDATE
  USING (
    profile_id IN (
      SELECT id FROM profiles WHERE user_id = auth.uid()
    ) AND
    status IN ('draft', 'pending_review')
  );

-- Admins can read/update all needs
CREATE POLICY "needs_admin_all" ON needs
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

---

### 4. `pledges` Table

```sql
ALTER TABLE pledges ENABLE ROW LEVEL SECURITY;

-- Backers can read their own pledges
CREATE POLICY "pledges_select_own" ON pledges
  FOR SELECT
  USING (backer_user_id = auth.uid());

-- Tradespeople can read pledges to their needs
CREATE POLICY "pledges_select_recipient" ON pledges
  FOR SELECT
  USING (
    need_id IN (
      SELECT needs.id FROM needs
      JOIN profiles ON needs.profile_id = profiles.id
      WHERE profiles.user_id = auth.uid()
    )
  );

-- Backers can create pledges
CREATE POLICY "pledges_insert_own" ON pledges
  FOR INSERT
  WITH CHECK (backer_user_id = auth.uid());

-- Admins can read all pledges
CREATE POLICY "pledges_admin_select" ON pledges
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

---

### 5. `vouches` Table

```sql
ALTER TABLE vouches ENABLE ROW LEVEL SECURITY;

-- Anyone can read approved vouches
CREATE POLICY "vouches_select_approved" ON vouches
  FOR SELECT
  USING (status = 'approved');

-- Vouchers can read their own vouches (all statuses)
CREATE POLICY "vouches_select_own" ON vouches
  FOR SELECT
  USING (voucher_user_id = auth.uid());

-- Recipients can read vouches about them
CREATE POLICY "vouches_select_recipient" ON vouches
  FOR SELECT
  USING (
    recipient_profile_id IN (
      SELECT id FROM profiles WHERE user_id = auth.uid()
    )
  );

-- Users can create vouches (if eligible)
CREATE POLICY "vouches_insert_eligible" ON vouches
  FOR INSERT
  WITH CHECK (
    voucher_user_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE user_id = auth.uid() AND can_vouch = TRUE
    )
  );
```

---

### 6. `verifications` Table

```sql
ALTER TABLE verifications ENABLE ROW LEVEL SECURITY;

-- Users can read their own verification
CREATE POLICY "verifications_select_own" ON verifications
  FOR SELECT
  USING (
    profile_id IN (
      SELECT id FROM profiles WHERE user_id = auth.uid()
    )
  );

-- Users can insert their own verification
CREATE POLICY "verifications_insert_own" ON verifications
  FOR INSERT
  WITH CHECK (
    profile_id IN (
      SELECT id FROM profiles WHERE user_id = auth.uid()
    )
  );

-- Admins can read all verifications
CREATE POLICY "verifications_admin_select" ON verifications
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

---

### 7. `notifications` Table

```sql
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Users can read their own notifications
CREATE POLICY "notifications_select_own" ON notifications
  FOR SELECT
  USING (user_id = auth.uid());

-- Users can update their own notifications (mark as read)
CREATE POLICY "notifications_update_own" ON notifications
  FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- System/admins can insert notifications
CREATE POLICY "notifications_insert_system" ON notifications
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'system')
    )
  );
```

---

## Triggers and Functions

### 1. Update `updated_at` Timestamp

```sql
-- Generic function to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_needs_updated_at BEFORE UPDATE ON needs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pledges_updated_at BEFORE UPDATE ON pledges
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ... (apply to all relevant tables)
```

---

### 2. Update Badge Level on Vouch Changes

```sql
CREATE OR REPLACE FUNCTION recalculate_badge_level()
RETURNS TRIGGER AS $$
DECLARE
  profile_record RECORD;
  vouch_count_approved INTEGER;
  community_leader_vouch_count INTEGER;
  has_geotag BOOLEAN;
  has_verification BOOLEAN;
BEGIN
  -- Get profile details
  SELECT * INTO profile_record FROM profiles WHERE id = NEW.recipient_profile_id;
  
  -- Count approved vouches
  SELECT COUNT(*) INTO vouch_count_approved
  FROM vouches
  WHERE recipient_profile_id = NEW.recipient_profile_id
    AND status = 'approved';
  
  -- Count community leader vouches
  SELECT COUNT(*) INTO community_leader_vouch_count
  FROM vouches
  WHERE recipient_profile_id = NEW.recipient_profile_id
    AND status = 'approved'
    AND is_community_leader_vouch = TRUE;
  
  -- Check for geotagged photo
  SELECT EXISTS (
    SELECT 1 FROM needs
    WHERE profile_id = NEW.recipient_profile_id
      AND photo_geotag_lat IS NOT NULL
      AND photo_geotag_lng IS NOT NULL
  ) INTO has_geotag;
  
  -- Check for NIN/BVN verification
  SELECT EXISTS (
    SELECT 1 FROM verifications
    WHERE profile_id = NEW.recipient_profile_id
      AND verified = TRUE
  ) INTO has_verification;
  
  -- Update badge level based on criteria
  IF community_leader_vouch_count >= 1 AND vouch_count_approved >= 10 THEN
    UPDATE profiles SET badge_level = 'level_3_established', badge_updated_at = NOW()
    WHERE id = NEW.recipient_profile_id;
  ELSIF has_verification AND has_geotag AND vouch_count_approved >= 5 THEN
    UPDATE profiles SET badge_level = 'level_2_trusted_tradesperson', badge_updated_at = NOW()
    WHERE id = NEW.recipient_profile_id;
  ELSIF has_verification AND vouch_count_approved >= 3 THEN
    UPDATE profiles SET badge_level = 'level_1_community_member', badge_updated_at = NOW()
    WHERE id = NEW.recipient_profile_id;
  ELSIF has_verification THEN
    UPDATE profiles SET badge_level = 'level_0_unverified', badge_updated_at = NOW()
    WHERE id = NEW.recipient_profile_id;
  END IF;
  
  -- Update cached vouch count
  UPDATE profiles SET vouch_count = vouch_count_approved
  WHERE id = NEW.recipient_profile_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER vouch_badge_recalculation
  AFTER INSERT OR UPDATE ON vouches
  FOR EACH ROW
  EXECUTE FUNCTION recalculate_badge_level();
```

---

### 3. Update Funded Amount on Pledge

```sql
CREATE OR REPLACE FUNCTION update_need_funded_amount()
RETURNS TRIGGER AS $$
BEGIN
  -- Update funded amount and pledge count
  UPDATE needs
  SET 
    funded_amount = (
      SELECT COALESCE(SUM(amount), 0)
      FROM pledges
      WHERE need_id = NEW.need_id AND payment_status = 'completed'
    ),
    pledge_count = (
      SELECT COUNT(*)
      FROM pledges
      WHERE need_id = NEW.need_id AND payment_status = 'completed'
    ),
    updated_at = NOW()
  WHERE id = NEW.need_id;
  
  -- Update status to 'funded' if 100% reached
  UPDATE needs
  SET status = 'funded', completed_at = NOW()
  WHERE id = NEW.need_id
    AND status = 'active'
    AND funded_amount >= item_cost;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER pledge_update_need_amount
  AFTER INSERT OR UPDATE ON pledges
  FOR EACH ROW
  EXECUTE FUNCTION update_need_funded_amount();
```

---

### 4. Create Milestones on Pledge

```sql
CREATE OR REPLACE FUNCTION create_milestone_on_pledge()
RETURNS TRIGGER AS $$
DECLARE
  need_record RECORD;
  current_percentage DECIMAL(5, 2);
BEGIN
  -- Get need details
  SELECT * INTO need_record FROM needs WHERE id = NEW.need_id;
  
  -- Calculate current funding percentage
  current_percentage := (need_record.funded_amount / need_record.item_cost) * 100;
  
  -- Create 50% milestone
  IF current_percentage >= 50 THEN
    INSERT INTO milestones (need_id, milestone_pct)
    VALUES (NEW.need_id, 50)
    ON CONFLICT (need_id, milestone_pct) DO NOTHING;
  END IF;
  
  -- Create 80% milestone
  IF current_percentage >= 80 THEN
    INSERT INTO milestones (need_id, milestone_pct)
    VALUES (NEW.need_id, 80)
    ON CONFLICT (need_id, milestone_pct) DO NOTHING;
  END IF;
  
  -- Create 100% milestone
  IF current_percentage >= 100 THEN
    INSERT INTO milestones (need_id, milestone_pct)
    VALUES (NEW.need_id, 100)
    ON CONFLICT (need_id, milestone_pct) DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER milestone_creation
  AFTER UPDATE ON needs
  FOR EACH ROW
  WHEN (NEW.funded_amount > OLD.funded_amount)
  EXECUTE FUNCTION create_milestone_on_pledge();
```

---

### 5. Track Vouch Velocity

```sql
CREATE OR REPLACE FUNCTION track_vouch_velocity()
RETURNS TRIGGER AS $$
DECLARE
  current_month VARCHAR(7);
  current_count INTEGER;
BEGIN
  current_month := TO_CHAR(NOW(), 'YYYY-MM');
  
  -- Insert or update velocity tracking
  INSERT INTO vouch_velocity_tracking (user_id, month_year, vouches_given_count)
  VALUES (NEW.voucher_user_id, current_month, 1)
  ON CONFLICT (user_id, month_year)
  DO UPDATE SET 
    vouches_given_count = vouch_velocity_tracking.vouches_given_count + 1,
    updated_at = NOW();
  
  -- Check if limit exceeded (5 per month)
  SELECT vouches_given_count INTO current_count
  FROM vouch_velocity_tracking
  WHERE user_id = NEW.voucher_user_id AND month_year = current_month;
  
  IF current_count > 5 THEN
    UPDATE vouch_velocity_tracking
    SET limit_exceeded = TRUE, limit_exceeded_at = NOW()
    WHERE user_id = NEW.voucher_user_id AND month_year = current_month;
    
    -- Optionally raise exception to prevent vouch
    RAISE EXCEPTION 'Vouch limit exceeded for this month';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER vouch_velocity_tracker
  BEFORE INSERT ON vouches
  FOR EACH ROW
  EXECUTE FUNCTION track_vouch_velocity();
```

---

### 6. Enable Vouching After 30 Days

```sql
CREATE OR REPLACE FUNCTION enable_vouching_after_30_days()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.created_at <= NOW() - INTERVAL '30 days' AND OLD.can_vouch = FALSE THEN
    NEW.can_vouch := TRUE;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- This would be run via a scheduled Edge Function, not a trigger
-- Scheduled job would be: UPDATE profiles SET can_vouch = TRUE WHERE created_at <= NOW() - INTERVAL '30 days' AND can_vouch = FALSE;
```

---

### 7. Audit Log on Sensitive Changes

```sql
CREATE OR REPLACE FUNCTION log_sensitive_changes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'UPDATE' THEN
    INSERT INTO audit_log (
      user_id,
      action,
      entity_type,
      entity_id,
      old_values,
      new_values
    ) VALUES (
      auth.uid(),
      TG_TABLE_NAME || '_updated',
      TG_TABLE_NAME,
      NEW.id,
      to_jsonb(OLD),
      to_jsonb(NEW)
    );
  ELSIF TG_OP = 'INSERT' THEN
    INSERT INTO audit_log (
      user_id,
      action,
      entity_type,
      entity_id,
      new_values
    ) VALUES (
      auth.uid(),
      TG_TABLE_NAME || '_created',
      TG_TABLE_NAME,
      NEW.id,
      to_jsonb(NEW)
    );
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO audit_log (
      user_id,
      action,
      entity_type,
      entity_id,
      old_values
    ) VALUES (
      auth.uid(),
      TG_TABLE_NAME || '_deleted',
      TG_TABLE_NAME,
      OLD.id,
      to_jsonb(OLD)
    );
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Apply to sensitive tables
CREATE TRIGGER audit_verifications AFTER INSERT OR UPDATE OR DELETE ON verifications
  FOR EACH ROW EXECUTE FUNCTION log_sensitive_changes();

CREATE TRIGGER audit_pledges AFTER INSERT OR UPDATE ON pledges
  FOR EACH ROW EXECUTE FUNCTION log_sensitive_changes();
```

---

## Data Retention and Compliance

### NDPR Compliance

**Data Retention Policy:** 24 months for inactive accounts

```sql
-- Scheduled job to soft-delete inactive accounts (run monthly)
CREATE OR REPLACE FUNCTION soft_delete_inactive_accounts()
RETURNS void AS $$
BEGIN
  UPDATE users
  SET 
    deleted_at = NOW(),
    is_active = FALSE,
    email = NULL, -- Clear PII
    phone = CONCAT('DELETED_', id) -- Anonymize phone
  WHERE 
    last_login_at < NOW() - INTERVAL '24 months'
    AND deleted_at IS NULL
    AND data_deletion_requested_at IS NULL;
END;
$$ LANGUAGE plpgsql;

-- User-requested data deletion
CREATE OR REPLACE FUNCTION request_data_deletion(user_id_param UUID)
RETURNS void AS $$
BEGIN
  UPDATE users
  SET data_deletion_requested_at = NOW()
  WHERE id = user_id_param;
  
  -- Anonymize profile
  UPDATE profiles
  SET 
    story = 'Content removed at user request',
    photo_url = NULL
  WHERE user_id = user_id_param;
  
  -- Anonymize needs
  UPDATE needs
  SET 
    story = 'Content removed at user request',
    photo_url = NULL,
    proof_photo_url = NULL,
    proof_video_url = NULL
  WHERE profile_id IN (SELECT id FROM profiles WHERE user_id = user_id_param);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

### NIN/BVN Hash Storage

**Critical Security Function:**

```sql
-- Function to hash NIN/BVN (called from application layer)
CREATE OR REPLACE FUNCTION hash_identity_number(identity_number TEXT, salt TEXT)
RETURNS VARCHAR(64) AS $$
BEGIN
  RETURN encode(digest(identity_number || salt, 'sha256'), 'hex');
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Example usage in application:
-- const ninHash = await supabase.rpc('hash_identity_number', { 
--   identity_number: nin, 
--   salt: process.env.NIN_SALT 
-- });
```

---

## Performance Monitoring Queries

### 1. Active Needs Performance

```sql
-- Monitor active needs query performance
EXPLAIN ANALYZE
SELECT n.*, p.name, p.trade_category, p.badge_level
FROM needs n
JOIN profiles p ON n.profile_id = p.id
WHERE n.status = 'active'
  AND p.location_state = 'lagos'
  AND p.trade_category = 'tailor'
ORDER BY n.created_at DESC
LIMIT 20;
```

---

### 2. Badge Level Distribution

```sql
-- Monitor badge level distribution
SELECT badge_level, COUNT(*) as count
FROM profiles
GROUP BY badge_level
ORDER BY count DESC;
```

---

### 3. Fraud Detection Hotspots

```sql
-- Identify users with multiple fraud flags
SELECT 
  u.id,
  u.name,
  u.phone,
  p.fraud_flags,
  COUNT(fde.id) as fraud_events
FROM users u
JOIN profiles p ON u.id = p.user_id
LEFT JOIN fraud_detection_events fde ON fde.user_id = u.id
WHERE p.fraud_flags > 0
GROUP BY u.id, u.name, u.phone, p.fraud_flags
ORDER BY fraud_events DESC, p.fraud_flags DESC;
```

---

## Migration Notes

### Initial Seed Data

```sql
-- Insert system admin user
INSERT INTO users (id, phone, name, role, phone_verified_at)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  '+2348000000000',
  'System Admin',
  'admin',
  NOW()
);

-- Insert trade category reference data (if needed)
-- Trade categories are defined as ENUM, so no seed data required

-- Insert Nigerian states reference data (if using separate table)
-- States are defined as ENUM, so no seed data required
```

---

## Backup and Recovery

### Backup Strategy

```sql
-- Point-in-time recovery enabled (Supabase default)
-- Daily automated backups to separate geographic region
-- 30-day retention for all backups

-- Manual backup command (if needed):
-- pg_dump -h db.xxx.supabase.co -U postgres -d postgres -F c -f buildbridge_backup_$(date +%Y%m%d).dump
```

---

## Schema Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | 2026-04-12 | Initial schema for MVP | Backend Team |

---

**End of Schema Documentation**
