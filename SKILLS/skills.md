# General Skills Rules

This file defines the baseline engineering, product, and design standards for the BuildBridge platform to ensure a cohesive, trustworthy, and dignified experience.

## 1. Project-Wide Engineering Standards

### Code Organization
We prioritize maintainability and modularity. Large, monolithic files are prohibited. Features must be organized into clear modules:
* `onboarding` (Tradesperson and Backer flows)
* `listings` (Micro-need creation and management)
* `discovery` (Browse, filter, and search)
* `verification` (Vouching and badge systems)
* `impact` (Impact Feed, Impact Wall, and Proof-of-Use)
* `payments` (Pledge flows and escrow handling)

### Naming Conventions
* **Files/Folders**: `kebab-case`
* **Components**: `PascalCase`
* **Functions/Variables**: `camelCase`
* **Constants/Enums**: `UPPER_SNAKE_CASE`

### Data Validation & Safety
* **Zero-Trust Input**: All client input must be validated and sanitized server-side before persistence.
* **Phone-First Normalization**: As a phone-first platform, all Nigerian phone numbers must be normalized to a standard format (e.g., +234...) before storage.
* **Idempotency**: All pledge and disbursement operations must include idempotency safeguards to prevent double-funding or duplicate payments.
* **Low-Bandwidth Optimization**: Messaging and API payloads must be minimized. Asset-heavy operations (like high-res photo uploads) must have client-side compression.

## 2. User Interface & Design Standards

BuildBridge follows a **Modern-Premium** aesthetic that prioritizes **Dignity** over charity.

### UI Implementation Rules
* **Tokens Only**: All UI styling must reference tokens defined in `design-tokens.css`.
* **No Raw Hex**: Direct hex color usage is strictly prohibited in components.
* **Tailwind Usage**: Use Tailwind for layout (spacing, borders, radii, shadows) but **never** for color or typography. Use `var(--token-name)` instead.
* **Mobile-First Constraint**: Designs must follow the "one field per screen" progressive disclosure rule to aid low-literacy users.

### Color Philosophy (Semantic Roles)
The color system must feel **Trustworthy, Calm, and Structured**.
* **Primary**: Used for "Investment" actions (Pledge, Verify, Submit Proof).
* **Surface/Background**: Use clean, card-based layouts with generous spacing to avoid a "cheap" or "crowded" feel.
* **Success**: Used for funding completion and successful proof-of-use updates.
* **Warning/Error**: Used for moderation states or missing updates; must be actionable and never patronizing.

### Typography
* **Target Literacy**: Copy must target a Primary 6 reading level.
* **Hierarchy**: Use strong, clear headings to guide users through the funding journey.

## 3. Product & Content Vocabulary

To maintain the project’s mission of "Investment in Skilled Work," agents and developers must use the following terminology:

| Banned Term | Required Term | Context |
| Donor / Charity | **Backer** | The person providing funds |
| Donation | **Pledge** | The act of supporting a need |
| Beneficiary | **Tradesperson / Claimant** | The skilled worker |
| Campaign | **Need** | The specific business requirement |
| Endorse | **Vouch** | The community trust signal |
| Receipt | **Proof-of-Use** | The evidence of impact |

## 4. Feature Expectations & Edge Cases

### Empty States
Every data-driven surface must include a dignified empty state:
* **No Needs Found**: "No active needs in this category yet. Check back soon or browse other trades."
* **No Pledges**: "Be the first to back this tradesperson and kickstart their growth."
* **Empty Impact Wall**: "Stories of growth will appear here once funding is complete."

### Failure Thinking
Each feature must explicitly handle:
* **Zero Pledges**: Re-engagement prompts for the tradesperson.
* **Slow Connections**: Skeleton screens and optimistic UI updates for low-bandwidth users.
* **Missing Proof**: Escalation paths for moderation.


## 5. Security & Compliance
* **NDPR Compliance**: Explicit consent must be captured for all personal data.
* **Visible Trust**: Verification badges and escrow transparency are core UI requirements, not "extra" features.
* **Authentication**: Phone-based OTP is the primary auth method. Email is optional.

## 6. Testing Standard
Verification is required for:
1.  **Primary Workflow**: Successful pledge/listing creation.
2.  **Low-Bandwidth Behavior**: UI stability under high latency.
3.  **Low-Literacy Accessibility**: Flow completion without external help.
4.  **Security**: Prevention of unauthorized access to admin/moderation tools.