# Color System Rules — BuildBridge

This document defines the application, semantic meaning, and standards for color usage across the BuildBridge platform.

All color implementation must reinforce the project’s mission of providing a trustworthy, premium, and dignified system for skilled work[cite: 8, 11, 12, 131].


## 1. Source of Truth
The single source of truth for all color values is `design-tokens.css`.

* **Prohibited**: Direct hex codes (e.g., `#000000`), raw RGB, or HSL values in components.

* **Requirement**: All colors must be referenced via CSS variables, such as `var(--color-primary)`.

* **Tailwind Policy**: Use Tailwind CSS for layout, spacing, and borders, only if the `design-tokens.css` does not make any provision for that but **never** for color or typography utilities.

## 2. Color Philosophy
BuildBridge is a platform for micro-entrepreneurs and community investment. The color palette must communicate:

**Dignity**: Avoid "pity-based" colors or overly soft, "charity-like" colors.

**Trust**: Use stable, confident tones that signal security and professional verification.

**Clarity**: Colors must help low-literacy users distinguish between different actions and states quickly.

**Premium Quality**: The UI should feel like a high-end financial tool, not a cheap template.

## 3. Semantic Color Roles

### Brand and Primary Action
**`--color-primary`**: Reserved for the "Investment" signal—primary buttons like **Pledge**, **Verify**, or **Submit Proof-of-Use**.

**`--color-on-primary`**: Text or icons sitting on top of primary surfaces to ensure accessible contrast.

### Surface System (Card-Based Layout)
BuildBridge relies on strong card systems and generous spacing to maintain a structured feel.

**`--color-background`**: The base screen color optimized for mobile-first views.

**`--color-surface`**: Used for the primary content cards and dashboard elements.

**`--color-outline-variant`**: Subtle borders for cards to maintain structure without creating visual noise.

### Status and Trust Signals
Trust must be visible in the UI through badges and state changes.

**Verification Badge**: A specific "Trust" token used for verified tradesperson profiles.

**Funding Progress**: Used for progress bars toward a micro-need goal.

**Proof-of-Use**: Positive accents used for successful disbursement and impact stories.

**Alert/Review**: Specifically for "Moderation Review," "Fraud Prevention," or "Under-Review" states.


## 4. Usage by Product Area

### Onboarding & Listing Creation
* Use **Primary Container** colors for visual selectors when choosing trade categories.
* Keep backgrounds **Calm** and **Structured** to reduce anxiety for first-time digital users.

### The Impact Feed & Wall
* This area should feel **Human** and **Encouraging**.
* Use neutral tokens to support content-led layouts where the tradesperson's media provides the visual narrative.

### Pledge Flow
**Transparency is priority**: Use distinct colors for fee breakdowns and the exact amount the tradesperson receives.
* Payment confirmation should feel "calm and clear," avoiding high-stress tones.

## 5. Accessibility and Context

**Low-Literacy Visual Anchors**: Color must never be the sole indicator of meaning; all status changes (e.g., "Verified" or "Under-Review") must pair semantic tokens with clear, recognizable iconography to assist users with lower digital literacy.

**High-Contrast Outdoor Readability**: Color tokens must meet high-contrast accessibility standards to ensure the interface remains usable for tradespeople working in bright, outdoor environments common in the Nigerian context.

**Trust-State Distinction**: Use distinct, non-ambiguous color roles to differentiate between a "Vouched" status and a "Moderation" state, ensuring the user immediately understands their progress toward trust badges without confusion.

**Data-Light Signifiers**: Avoid heavy color gradients or decorative fills; use solid tokenized accents to ensure clarity and fast rendering for users on limited data and low-bandwidth connections.

**Dignified Action Feedback**: Interactive states for "Pledge" and "Proof-of-Use" buttons must use calm, confident color shifts rather than aggressive or high-stress visual alarms, maintaining a professional and respectful tone.

* **Progressive Disclosure Guidance**: Use subtle background color shifts (`--color-surface-variant`) to focus the user’s attention on a single task or field at a time, reducing cognitive load for first-time crowdfunding users.

## 6. Prohibited Practices

* **No Charity Palettes**: Do not use "soft/pitying" colors often associated with charity or NGOs.

* **No Raw Styling**: Never bypass tokens to use Tailwind's default color palette (e.g., `bg-blue-500`).

* **No Hidden States**: Never use color to hide fees, trust steps, or moderation requirements.