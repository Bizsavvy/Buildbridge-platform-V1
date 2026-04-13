# TEAM 3

# BuildBridge PRD

# **1\.  Executive Summary**

BuildBridge is a Nigeria-native, web-based micro-crowdfunding platform built exclusively for informal tradespeople and micro-entrepreneurs. It enables artisans — tailors, carpenters, welders, cobblers, food processors, and market traders — to create targeted, small-scale funding requests for specific business needs: a broken sewing machine, a set of tools, raw material stock. Unlike GoFundMe, Kickstarter, and Indiegogo, which block Nigerian payment infrastructure and serve Western markets, BuildBridge is built from the ground up for the Nigerian context.  
The platform solves a precise, documented problem: six UX survey respondents across Lagos, Ibadan, Anambra, and Nnewi are currently borrowing from family, using loan apps charging 30–40% interest, or going without funding entirely. None are using any crowdfunding platform — not because they do not need it, but because no platform exists that speaks their language, accepts their payment methods, or builds trust through their community.

| Mission Statement BuildBridge exists to make it easy for people in Nigeria to back the skilled workers building their communities — one specific need, one honest story, and one community vouch at a time. We use the language of investment, not charity. We measure success by tools repaired, businesses restored, and livelihoods secured. |
| :---- |

# **2\.  Problem Statement**

## **2.1  The Validated Problem**

Tradespeople in Nigeria's informal economy face a documented funding gap that existing platforms are structurally unable to fill. The evidence comes directly from six UX survey respondents and five personas developed through primary research.

| Respondent | Trade | Current Funding Method | Emotional Cost |
| :---- | :---- | :---- | :---- |
| Ada (TP-01) | Baker / Food Vendor | None — going without | Embarrassment, income loss |
| Emeka (TP-02) | Carpenter | None — informal broken promises | Distrust, vulnerability |
| Yetunde (TP-03) | Tailor | Personal savings only | Shame, psychological exhaustion |
| Patience | Undisclosed | Loan apps at 30–40% interest | Financial stress, debt spiral |
| Kester | Undisclosed | Family — in person | Embarrassment |
| Oluchi | Undisclosed | Family — in person | Trust dependency |
| Emmanuel | Undisclosed | Family — in person | Embarrassment |
| Yanny | Undisclosed | Nobody — does without | Negative, small networks |
| Paul | Undisclosed | None — does without | Trust broken, extremely difficult |

## **2.2  Why Existing Platforms Fail**

No survey respondent currently uses any crowdfunding platform. The real competition for BuildBridge is loan apps charging 30–40% interest and complete financial silence — not GoFundMe or Kickstarter.

| Platform | Core Failure for Nigerian Tradespeople |
| :---- | :---- |
| GoFundMe | Blocks Nigerian payment withdrawal; no NIN/BVN support; charity framing alienates tradespeople |
| Kickstarter | All-or-nothing funding model; Nigeria not supported as a creator country |
| Indiegogo | Pivoting to gaming; no Nigerian payment infrastructure; 13% historical success rate |
| Crowdr | General purpose — no trade niche, no skill verification, no post-funding accountability |
| NaijaFund | Highest local fees (7%); minimal identity verification; no trade specificity |
| Loan Apps | Interest rates of 30–40%; debt spiral risk; no community accountability |
| Family/Ajo | Limited to personal network size; cannot reach diaspora or institutional funders |

# **3\.  Product Vision and Goals**

| Vision BuildBridge will become the most trusted platform for backing skilled tradespeople in Nigeria — a place where community vouching, verified craft, and honest need listings connect genuine skill with willing backers. We measure success in tools repaired, livelihoods restored, and first-time backers who return. |
| :---- |

## **3.1  Strategic Goals by Phase**

### **MVP — 0 to 3 Months**

* Onboard 500 verified tradesperson profiles across 5+ trade categories in Lagos, Ibadan, and Anambra  
* Complete 200 successful needs (100% funded) with proof-of-use updates submitted within 14 days  
* Achieve NGN 5 million in total pledges processed  
* Register 1,000 backers with a Net Promoter Score above 40  
* Partner with at least 10 market associations as community anchor points  
* Achieve listing fraud rate below 2% and platform uptime of 99.5%  
* Publish a minimum of 30 tradesperson stories on the Impact Wall

### **6 to 18 Months**

* Expand to 5,000 verified tradesperson profiles across 10 Nigerian states  
* Introduce PWA installable experience and SMS-first notification system  
* Launch corporate/CSR portal and diaspora-specific backer flows  
* Achieve NGN 25 million in total pledges with 75% of needs successfully funded  
* Reach 150 published stories on the Impact Wall with multimedia (photo and video) coverage

### **18 to 36 Months**

* Expand to Ghana, Kenya, and Senegal with local payment infrastructure  
* Build creditworthiness scoring layer using platform history for formal lending referrals  
* Launch native iOS and Android apps with offline capability  
* Establish BuildBridge Foundation for grant-based support to the most vulnerable tradespeople

## **3.2  Success Metrics**

| Metric | Category | Persona | MVP Target | 6-Month Target |
| :---- | :---- | :---- | :---- | :---- |
| Verified tradesperson profiles | Growth | Ada, Emeka, Yetunde | 500 | 2,000 |
| Needs 100% funded | Outcome | All tradespeople | 120 (60%) | 600 (75%) |
| Post-funding updates submitted within 14d | Retention | Temi, Chukwuemeka | 90% of funded | 95% |
| Backers returning for a second pledge | Retention | Temi | 30% | 50% |
| Onboarding completion without external help | Low-literacy UX | Emeka | 70% | 85% |
| Time from listing creation to first pledge | Momentum | Ada | \<48 hours | \<24 hours |
| Registered backers | Growth | Temi, Chukwuemeka | 1,000 | 5,000 |
| Diaspora backers (international IP) | Growth | Chukwuemeka | 100 | 500 |
| Impact Wall stories published | Social proof | All visitors | 30 | 150 |
| Net Promoter Score | Satisfaction | All | 40 | 55 |
| Listing fraud rate | Safety | All | \<2% | \<1% |
| Platform uptime | Technical | All | 99.5% | 99.9% |

# **4\.  Target Users and Use Cases**

## **4.1  User Types**

| User Type | Persona | Description | Primary Goal on BuildBridge |
| :---- | :---- | :---- | :---- |
| Tradesperson / Claimant | Ada (Baker), Emeka (Carpenter), Yetunde (Tailor) | Informal sector workers with genuine craft skills and a specific, small funding need | Create a verified need listing; receive pledges; buy the item; submit proof-of-use update |
| Backer / Supporter | Temi (Lagos professional), Chukwuemeka (UK diaspora) | Individuals who want to back real skilled work with verifiable impact | Discover needs; pledge support; receive proof-of-use closure |
| Community Voucher | Mama Bisi (market elder) | Trusted community members who vouch for the tradesperson's character and legitimacy | Vouch for a known tradesperson using their own verified phone number |
| Community Leader / Partner | Chidi (market association chair) | Market association heads, cooperative leaders, and CDA chairs who can endorse tradespeople at scale | Endorse tradespeople; manage association profile; view aggregate impact |

## **4.2  Use Cases**

| Use Case | Actor | Description | Emotional State |
| :---- | :---- | :---- | :---- |
| Create a need listing | Tradesperson | Register via phone OTP, create trade profile, write need details, receive AI-generated impact statement, submit for review | Nervous → relieved when guided prompts make it simple |
| Back a tradesperson | Backer | Browse needs by trade or location, view verification badge and vouch list, review fee breakdown, confirm pledge | Curious → cautious → satisfied when verification is clear |
| Share on WhatsApp | Tradesperson or Backer | One-tap share generates rich preview card with photo, progress bar, CTA, and impact statement for WhatsApp or Instagram | Proud to share something meaningful |
| Vouch for someone | Community member | Visit tradesperson profile, select relationship type, write statement, confirm non-financial responsibility declaration | Loyal, cautious → reassured when liability is clearly non-financial |
| Submit proof-of-use update | Tradesperson (post-fund) | Upload photo or video of purchased item with brief caption; system notifies all backers and prompts Impact Wall opt-in | Grateful, triumphant — closure moment |
| Browse the Impact Wall | Any visitor (public) | Explore the public Impact Wall — funded stories, photos, and videos — with no login required | Inspired, trusting — powerful social proof for first-time visitors |
| View Impact Feed | Logged-in Backer | Chronological feed of proof-of-use updates from funded tradespeople | Satisfied, emotionally connected to real impact |
| Report a suspicious listing | Any user | Flag listing for admin review via report button | Protective of community trust |
| Fail gracefully | Tradesperson | Need reaches deadline below 100% — tradesperson keeps all pledges received (keep-what-you-raise model) | Disappointed but not humiliated — partial funding still helps |

## **4.3  Edge Cases and Failure Scenarios**

* Zero pledges:  Need reaches a deadline with zero pledges. Tradesperson receives a private message with pre-written share prompts and a 7-day extension option. The campaign is never made publicly visible as 'failed'.

* Disputed vouch:  Vouch is disputed or found fraudulent. Voucher's trust score is penalised; they cannot vouch for 90 days. Tradesperson's badge level is recalculated. Admin reviews listing.

* Missing update:  Tradesperson does not submit proof-of-use update. Automated nudges sent at Day 3, 7, and 14\. If no update by Day 21, the account is flagged for review and future listings require manual admin approval.

* International payment:  International backers cannot pay via Paystack. Stripe payment path is offered as fallback with NGN equivalent displayed before confirmation.

* Duplicate listing:  Tradesperson creates a second listing before the first is complete. System alerts that only one active listing is permitted per account at MVP. The second listing is queued.

# **5\.  Feature Specifications**

Features are organised by MVP status. Every feature specifies the persona it serves, the empathy map pain it resolves, the competitive gap it addresses, and its acceptance criteria. The terms 'backer', 'pledge', 'need', and 'listing' are used throughout in place of the prohibited terms.

## **5.1  Tradesperson Profile**

| Status | MVP |
| :---- | :---- |
| Serves | Ada (TP-01), Emeka (TP-02), Yetunde (TP-03) |
| Pain resolved | Ada: 'Being laughed at or not taken seriously'. Yetunde: 'If my profile doesn't look professional, people will pity me'. Emeka: 'He has no digital profile — invisible'. |
| Competitive gap | Crowdr and GoFundMe: no trade-specific profiles or skill verification. |

Acceptance Criteria

* Full name, trade category (visual icon selector), LGA and state, profile photo  
* Personal story up to 300 words — guided with prompts: 'How long have you been doing this trade?' and 'What does your work mean to your community?'  
* Optional: years of experience, apprentices trained, certifications  
* Verification badge display (Level 0 through 4\) — visible prominently on all profile surfaces  
* Active and funded need history with proof-of-use update status  
* Vouch count and vouch list with relationship types displayed  
* One-tap WhatsApp share button on profile page  
* Profile preview screen before publishing — tradesperson sees exactly what backers will see  
* UX Principles for Low-Digital-Literacy Users: progressive disclosure (one field per screen on mobile), visual selectors for all categories, audio story recording option, maximum reading level at Primary 6

## **5.2  Micro-Need Listing**

| Status | MVP |
| :---- | :---- |
| Serves | All three tradesperson personas |
| Pain resolved | Ada: 'Blank fields intimidate'. Yetunde: 'If the writing feels robotic, she will delete it'. Emeka: 'Any step requiring long-form writing will cause dropout'. |
| Competitive gap | Kickstarter: all-or-nothing model. GoFundMe: no trade specificity. Crowdr: no impact framing. |

Acceptance Criteria

* Exact item name — with pre-filled common tools by trade category (e.g., for Tailor: sewing machine, overlocker, iron, fabric rolls)  
* Exact cost in NGN — no ranges, no approximations  
* Primary photo — with geotagged location verification  
* Short story up to 150 words — guided with sentence starters  
* AI-generated impact statement (DeepSeek) — can be accepted, regenerated up to 3 times, or manually edited  
* Keep-what-you-raise disclosure during creation: 'Unlike other platforms, you keep every Naira pledged to you, even if you do not reach your full target'  
* 48-hour Visibility Boost: every new need is featured in the Browse feed for its first 48 hours  
* 24-hour zero-pledge nudge: if no pledge is received within 24 hours, a WhatsApp message is sent to the tradesperson with pre-written share messages  
* Auto-generated Social Share Cards: WhatsApp 16:9 and Instagram story 9:16 formats, with photo, progress bar, impact statement, and 'Back' CTA  
* Campaign deadline (7–30 days) with real-time animated funding progress bar

## **5.3  Browse, Filter, and Discovery**

| Status | MVP |
| :---- | :---- |
| Serves | Temi (BP-01), Chukwuemeka (BP-02), all backers |
| Pain resolved | Temi: 'Discover campaigns through people she trusts — not algorithms'. Chukwuemeka: needs to find specific, verifiable tradespeople. |
| Competitive gap | GoFundMe: no trade filter. Kickstarter: no location-aware discovery. Crowdr: no verification-level filter. |

Acceptance Criteria

* Card-based browse feed of all active needs — default sorted by urgency  
* Filter by: trade category, location (state/LGA), funding progress, urgency level, verification badge level  
* Keyword search across listing titles, item names, and trade category  
* Sort by: newest, most urgent, nearly funded, most pledges  
* Similar funded needs showcase on campaign detail pages: 'See what backers like you enabled for other tailors in Lagos'  
* Trade-specific community indicators: 'X other tailors in Lagos have received backing this month'

## **5.4  Pledge (Backing) System**

| Status | MVP |
| :---- | :---- |
| Serves | Temi (BP-01), Chukwuemeka (BP-02) |
| Pain resolved | Temi: 'She gives money and never hears what happened'. Chukwuemeka: 'Wasting contribution on platform fees — no fee breakdown'. Temi: 'The platform disappearing with her money'. |
| Competitive gap | No benchmarked platform shows a full fee breakdown before payment or sends milestone notifications to backers. |

Acceptance Criteria

* Pledge button on every listing card and detail page — labelled 'Back This Tradesperson'  
* On pledge confirmation: tradesperson contact information (phone, WhatsApp link) is revealed to the backer  
* Fee Breakdown Screen before confirmation: pledge amount, platform fee (%), payment processing fee (%), and 'Amount this tradesperson receives: NGN X'  
* FX Transparency for international backers: estimated NGN equivalent displayed at live exchange rate before pledge is confirmed  
* Backer can add a personal message to the tradesperson at time of pledge  
* Backer receives SMS \+ WhatsApp confirmation (not email-only — Emeka and several survey respondents miss emails)  
* Tradesperson notified of each pledge in real time via WhatsApp/SMS  
* Celebratory first-pledge notification: 'Someone believes in your work\!' with confetti animation — not transactional  
* Milestone notifications to backers at 50%, 80%, and 100% funding with pre-written share prompt  
* Diaspora Sharing Prompt after pledge: 'Share with your community back home' with pre-written message template  
* Post-funding proof-of-use update (moved from Phase 2 to MVP) — tradesperson uploads photo or video of purchased item; all backers are notified

## **5.5  Verification Badge System (Community Vouching)**

| Status | MVP |
| :---- | :---- |
| Serves | All personas — builds trust for backers, reduces friction for tradespeople |
| Pain resolved | Ada/Emeka: 'Any mention of formal ID upfront will cause drop-off'. Yetunde: 'Strangers judging her financial situation'. Temi: 'She cannot tell which needs are real'. |
| Competitive gap | GoFundMe: verification only at withdrawal. Fundly: no verification. BuildBridge makes it tiered and progressive. |

| Badge Level | Name | Requirements | Funding Cap | What Backers See |
| :---- | :---- | :---- | :---- | :---- |
| Level 0 | Unverified | Phone OTP confirmed \+ NIN/BVN API check | NGN 20,000 | Phone number \+ NIN/BVN verified |
| Level 1 | Community Member | NIN/BVN API check \+ 3 vouches from verified users | NGN 50,000 | NIN/BVN \+ vouched by community |
| Level 2 | Trusted Tradesperson | NIN/BVN API check \+ geotagged photo \+ 5 vouches incl. 1 from verified business | NGN 150,000 | Identity \+ community verified |
| Level 3 | Established | 10 vouches \+ community leader endorsement | NGN 500,000 | Market association endorsed |
| Level 4 | Platform Verified | All above \+ selfie face-match \+ manual review by BuildBridge team | No cap | Fully verified |

* NIN/BVN verification is required at all badge levels, ensuring strong identity verification from the start while maintaining a progressive trust model through community vouching  
* Vouch flow uses plain language throughout — non-financial liability clearly stated: 'Vouching does not make you financially responsible. Your reputation is your commitment.'  
* Community leader accounts carry elevated vouch weight — their single endorsement counts as 5 standard vouches  
* New accounts cannot vouch for 30 days. Maximum 5 vouchers given per account per month to prevent fraud

## **5.6  AI-Powered Impact Statements**

| Status | MVP |
| :---- | :---- |
| Serves | Ada (TP-01), Emeka (TP-02), Yetunde (TP-03) |
| Pain resolved | Emeka: 'He cannot write long-form — AI story generation is a necessity, not a feature'. Ada: 'Blank fields intimidate'. Yetunde: 'If the writing feels robotic, she will delete it'. |
| AI provider | DeepSeek API with a trade-specific prompt engineering layer |
| Competitive gap | No benchmarked platform offers AI-assisted listing creation. GoFundMe places the storytelling burden entirely on the user. |

Acceptance Criteria

* After tradesperson enters item name, cost, and a brief story prompt, DeepSeek generates a personalised 1–2 sentence impact statement in under 10 seconds  
* Example outputs: 'A NGN 35,000 sewing machine repair enables Ada to complete 6 custom wedding outfits this season.' / 'Emeka's NGN 45,000 drill investment lets him take on 3 additional furniture contracts per month.'  
* Tradesperson can accept, regenerate (up to 3 times), or manually edit the impact statement  
* Impact statement displayed prominently on listing card and in all social share cards  
* Audio option: tradesperson can record their story verbally; AI transcribes and generates the statement — for very low literacy users

## **5.7  Lead Import and Partner Integration**

| Status | MVP — Backend only |
| :---- | :---- |
| Serves | Community leaders (Chidi), partner organisations |
| Pain resolved | Chidi: needs an efficient way to onboard his 200+ traders without individual registration burden. |
| Competitive gap | Crowdr: no institutional import tools. NaijaFund: no corporate portal. |

Acceptance Criteria

* Bulk CSV import for partner organisations (market associations, NGOs, cooperatives)  
* Webhook integration for partner platform referrals  
* Google Sheets integration for field officers collecting offline data  
* Import validation: duplicate detection by phone number and NIN/BVN hash  
* All imported profiles enter a pending review queue before going live

## **5.8  User Account and Settings**

| Status | MVP |
| :---- | :---- |
| Serves | All personas |
| Pain resolved | Yetunde: 'Let her control what is visible on her profile'. Ada: 'Putting information online and getting scammed'. Chukwuemeka: 'Platform legitimacy — needs to trust the infrastructure'. |
| Competitive gap | GoFundMe: no granular privacy controls. Fundly: no 2FA. |

Acceptance Criteria

* Account creation via phone OTP — email is optional (Emeka does not use email; Yanny has unreliable email)  
* Profile management: name, photo, bio, trade details, location  
* Notification preferences: SMS (default), WhatsApp (encouraged), email (optional)  
* Granular privacy settings: control visibility of contact info, pledge history, vouch details, and income implied by need amount  
* Account security: password reset and 2FA via OTP  
* Account deactivation and data deletion request — NDPR compliance  
* DEFERRED Phase 2:  Local language support (Yoruba, Hausa, Igbo) — deferred due to AI translation quality requirements and legal review of terms

## **5.9  Opt-in Management and Compliance**

| Status | MVP |
| :---- | :---- |
| Serves | All personas — regulatory requirement |
| Pain resolved | Temi: 'The platform disappearing with her money' — resolved by escrow disclosure. |
| Competitive gap | BuildBridge adds NDPR compliance and escrow transparency that all benchmarked competitors lack. |

Acceptance Criteria

* Explicit consent to Terms of Service, Privacy Policy, and Vouching Code of Conduct at registration  
* Backers explicitly opt in to sharing contact with tradesperson at point of pledge  
* NDPR compliance: data collection notice, right to access, right to erasure, 24-month retention policy  
* Cookie consent banner on first visit  
* Trust Account Disclosure before first pledge: 'Your pledge is held securely by our licensed payment partner (Paystack/Stripe) and released directly to the tradesperson upon need completion. BuildBridge does not commingle pledges with operational funds.'

## **5.10  Success Stories / Funded Needs Showcase**

| Status | MVP |
| :---- | :---- |
| Serves | Ada, Emeka, Yetunde, Temi |
| Pain resolved | Ada: 'She can see other successful needs before committing'. Emeka: 'Show me someone like me who got funded'. Yetunde: 'Other young tradespeople already using it' is a trust trigger. |
| Competitive gap | No competitor offers a funded campaign showcase optimised for trust-building at the consideration stage. |

Acceptance Criteria

* Dedicated 'Funded Needs' page showcasing completed needs with proof-of-use photos  
* Filterable by trade category — Ada sees other bakers, Emeka sees other carpenters  
* Each story card shows: item funded, amount raised, days to fund, tradesperson quote, proof-of-use photo  
* Featured on homepage and surfaced during listing creation: 'See what other tailors in Lagos have received'  
* Minimum requirement: a submitted proof-of-use photo is required before a story can appear in this section

## **5.11  Impact Feed**

| Status | MVP — moved from Phase 2 |
| :---- | :---- |
| Serves | Temi (BP-01), Chukwuemeka (BP-02) — backer retention critical |
| Pain resolved | Temi: 'No closure — she gives money and never hears what happened.' Chukwuemeka: 'Informal remittances disappear with no visibility.' |
| Competitive gap | No competitor offers post-campaign accountability. This is BuildBridge's primary differentiator against Crowdr. |
| Distinction | The Impact Feed is a logged-in, chronological, real-time update stream for backers tracking their pledged needs. The Impact Wall (Section 6.12) is a curated public gallery. They are separate surfaces with distinct purposes. |

Acceptance Criteria

* Chronological feed of proof-of-use updates from funded tradespeople — visible to all logged-in backers  
* Each update card: photo or video, caption from tradesperson, the specific need that was funded, and total amount raised  
* Backers who pledged to the specific need receive a WhatsApp/SMS notification when the update is posted  
* 'Back Another Tradesperson' CTA displayed prominently on every update card to drive return behaviour  
* Tradesperson receives nudges at Day 3, 7, and 14 to submit their update; non-submission is flagged for admin review

## **5.12  Impact Wall**  

## 

| Feature Distinction The Impact Wall is distinct from the Impact Feed (Section 5.11). Impact Feed:  Logged-in only · Chronological · Real-time notification stream · For backers tracking pledged needs. Impact Wall:  Public — no login required · Curated and evergreen · Multimedia (photo \+ video) · Designed as a top-of-funnel trust asset for first-time visitors and as a lasting tribute to funded tradespeople. |
| :---- |

| Status | MVP |
| :---- | :---- |
| Serves | All users — public-facing social proof, inspiration, and conversion driver |
| Pain resolved | First-time visitors need to see real evidence of impact before registering. Tradespeople want their story remembered and celebrated beyond a transactional feed. Backers want to see the cumulative, lasting weight of community support. |
| Competitive gap | No competitor offers a rich, publicly accessible multimedia gallery of funded tradespeople. GoFundMe's success stories are buried inside platform discovery. BuildBridge's Impact Wall is a living proof point accessible to any visitor — before they create an account. |
| Content source | Proof-of-use updates (photo or video) submitted by funded tradespeople, with explicit opt-in to public display. Moderated by admin before going live. |

Acceptance Criteria

* Dedicated public page accessible without login — prominently linked from the homepage primary navigation  
* Gallery-style layout showing funded tradesperson stories; each entry displays: profile photo, full name, trade, location, item funded, amount raised, a short written story or quote, and optionally a short video  
* Video support: tradespeople may submit a short video (maximum 90 seconds) as part of their proof-of-use update; if submitted, the video appears on the Impact Wall in place of or alongside the photo  
* Filterable by trade category and state — visitors can find stories that match their own trade or region  
* Each story card links through to the tradesperson's full profile and any active new need, supporting conversion to backer or tradesperson registration  
* Impact counters displayed prominently at the top of the page: total tradespeople funded, total NGN raised, and total trade categories represented — updated in real time  
* Content eligibility: only needs with a submitted proof-of-use update (photo or video) qualify for the Impact Wall — quality and authenticity are enforced  
* Tradesperson must explicitly opt in to having their story featured on the Impact Wall — consent is collected at the proof-of-use submission screen  
* All Impact Wall submissions pass through an admin moderation queue before going live — moderators can approve, request revision, or reject  
* Impact Wall is seeded with 10–20 pilot stories from beta tradespeople before public launch to ensure meaningful social proof from day one  
* DEFERRED Phase 2:  Backer testimonials featured alongside tradesperson stories — requires a separate backer consent flow and at least 50 published stories to be worthwhile

## **5.13  Role-Based Dashboard**

| Status | MVP |
| :---- | :---- |
| Serves | All personas — both tradesperson and backer versions required |
| Pain resolved | Ada needs to track her need's progress. Temi needs to see the status of needs she has backed. Chukwuemeka needs impact visibility. |
| Competitive gap | IA included both Tradesperson and Supporter dashboards — missing from PRD v1.0. |

Tradesperson Dashboard

* Active need: funding progress bar, pledge count, time remaining, share button  
* Funded needs history with proof-of-use update status and Impact Wall opt-in prompt  
* Pending verification steps — clearly shows the next badge requirement  
* Vouch status — who has vouched and how many more are needed for the next tier

Backer Dashboard

* Needs I have backed: funding progress, tradesperson name, update status  
* Notifications: new proof-of-use updates from tradespeople, milestone alerts  
* 'Browse New Needs' CTA prominent — encourages repeat backing  
* DEFERRED Phase 2:  Saved Needs / bookmark feature

## **5.14  How BuildBridge Works Page**

| Status | MVP |
| :---- | :---- |
| Serves | Emeka (TP-02) — first-time crowdfunding users |
| Pain resolved | Emeka: 'He has never heard of crowdfunding — no idea where to start'. |
| Competitive gap | No competitor offers a plain-language explainer optimised for the Nigerian informal economy context. |

Acceptance Criteria

* 3-screen visual carousel: (1) Create your need with a photo and story, (2) Your community backs you — your neighbours, your market, your diaspora, (3) Funds go to you — keep everything pledged  
* Each screen uses: a large icon, one sentence of body text at Primary 6 reading level, and no jargon  
* Accessible without login — linked from the homepage  
* Embedded Success Story card: 'See how Ada funded her oven repair in 3 days'  
* Disbursement explanation in plain language: 'When your need is funded, the money comes straight to your phone via bank transfer within 48 hours'

## **5.15  Help and Support**

| Status | MVP |
| :---- | :---- |
| Serves | All personas — primarily low-literacy users |
| Pain resolved | Emeka: 'Complex platforms he cannot navigate'. Ada: 'Fear of making a mistake she cannot undo'. Mama Bisi: 'I do not want to click the wrong thing'. |
| Competitive gap | No competitor in the Nigerian informal sector offers trade-specific support. |

Acceptance Criteria

* FAQ page covering: How does the money come to me? What happens if my need is not fully funded? How do vouchers work? Is my information safe?  
* WhatsApp support contact — the preferred channel for target users  
* Moderation dispute process: tradesperson can contest a rejected listing within 48 hours  
* Trust and Safety page explaining fraud prevention and community standards — visible without login

## **5.16  UX State Specifications**

| Status | MVP |
| :---- | :---- |
| Serves | All personas — primarily Emeka and Ada for error/empty states |
| Pain resolved | Emeka: 'Complex platforms he cannot navigate'. Ada: 'Fear of making a mistake she cannot undo'. |
| Competitive gap | IA included empty/loading/error/moderation states — missing from PRD v1.0. |

Acceptance Criteria

* Empty State: no active needs → show 'Create your first need' CTA with icon and encouragement. Zero browse results → 'No needs in this area yet. Be the first to create one.'  
* Loading State: skeleton screen placeholder layouts for all card feeds — cards shimmer while loading, no blank white screens  
* Error State: every error message includes what went wrong (plain language), what to do next (one action button), and a WhatsApp contact link if the action fails  
* Moderation State: listings under admin review show 'Under review — we will notify you within 24 hours'. No unexplained limbo.  
* 404 Page: 'This page does not exist' with navigation back to homepage and Browse Needs

# **6\.  Pain-to-Feature Resolution**

This section maps every key pain point identified in the empathy maps to the specific feature or design decision that addresses it.

| Persona | Pain Point | Feature / Decision | Section |
| :---- | :---- | :---- | :---- |
| Ada | Getting zero support in first 24 hours — public failure | 48-hour Visibility Boost \+ 24-hour WhatsApp nudge | 5.2 |
| Ada | Strangers judging her financial situation | Privacy controls — hide income implied by need amount | 5.8 |
| Ada | Putting information online and getting scammed | NDPR compliance, Row-Level Security, AES-256 encryption | 9, 10 |
| Ada | Social media fundraising feels desperate | Craft-first language, investment framing, professional card design | Global standard |
| Emeka | Has never heard of crowdfunding | How BuildBridge Works page \+ onboarding explainer carousel | 5.14 |
| Emeka | Complex platforms he cannot navigate | Visual-first UX, progressive disclosure, one field per screen | 5.1 |
| Emeka | Has been promised help before — it never came | Post-funding proof-of-use updates (MVP, not Phase 2\) | 5.4 |
| Yetunde | Stigma of 'asking for money' | 'Back' not 'Donate'; 'Need' not 'Campaign'; investment framing | Global standard |
| Yetunde | 'If my profile doesn't look professional, people will pity me' | Profile quality requirements \+ preview before publish | 5.1 |
| Yetunde | Needs beautiful shareable cards for Instagram | 9:16 Instagram story card auto-generated at listing creation | 5.2 |
| Temi | No closure — gives money, never hears what happened | Proof-of-use updates (MVP) \+ Impact Feed \+ Impact Wall | 5.4, 5.11, 5.12 |
| Temi | Cannot tell which needs are real | Verification badge system \+ community vouching \+ real photos | 5.5 |
| Temi | The platform disappearing with her money | Trust Account Disclosure — escrow explanation before pledge | 5.9 |
| Chukwuemeka | Wasting contribution on hidden fees | Fee breakdown screen before every pledge confirmation | 5.4 |
| Chukwuemeka | Exchange rate friction for small amounts | FX transparency — estimated NGN shown before pledge | 5.4 |
| All visitors | No way to assess platform credibility before signing up | Public Impact Wall — stories, photos, and videos, no login needed | 5.12 |
| All traders | 'Any mention of formal ID upfront will cause drop-off' | NIN/BVN required at all levels with guided, user-friendly verification flow and clear trust-building messaging | 5.5 |

# **7\.  Detailed User Flows**

This covers all 6 journey stages with emotional state annotations at every step. 

## **7.1  Awareness and Consideration**

Emotional arc:  Sceptical → Cautiously hopeful → Relieved → Committed

* User discovers BuildBridge via WhatsApp status share, Instagram story, community WhatsApp group, or word of mouth from a fellow tradesperson  |  Curious, sceptical  
* Lands on homepage — sees featured funded needs with proof-of-use photos, live impact counters, partner association logos, and trust badges  |  Cautiously hopeful  
* Reads 'How It Works' page — 3-screen visual carousel in plain language  |  Relieved ('This is simpler than I expected')  
* Browse the Impact Wall — real stories, photos, and videos of funded tradespeople in their trade category  |  Inspired, trusting  
* Reviews trust indicators: verification badge explanation, escrow disclosure, community vouching description, partner associations  |  Building confidence  
* Decides to register — clicks 'Create Your Need' or 'Back a Tradesperson'  |  Committed

## **7.2  Tradesperson Onboarding**

Emotional arc:  Nervous → Guided → Relieved → Proud

* Enter phone number → OTP → phone verified  |  Nervous ('Is this safe?')  
* 3-screen crowdfunding explainer carousel — visual, no jargon, trade examples  |  Curious ('Oh, I can do this?')  
* Select trade category using visual icon selector  |  Engaged ('They know my trade')  
* Enter LGA and state — two fields only  |  Easy  
* Upload profile photo with guidance: 'A clear face photo works best'  |  Slightly anxious  
* Write or record personal story — guided prompts appear  |  Focused  
* Profile preview screen: 'This is what backers will see'  |  Proud or wants to adjust  
* Agree to Terms of Service — plain language summary shown  |  Reassured  
* Profile created at Level 0; verification journey explained: 'Get 3 vouchers to unlock Level 1 and raise up to NGN 50,000'  |  Motivated

## **7.3  Need Creation**

Emotional arc:  Focused → Surprised by AI → Proud → Anxious wait

* Dashboard → 'Create a Need'  |  Determined  
* Select item from pre-filled trade-specific list or type custom item — pre-filled list reduces blank-field anxiety  |  Relieved  
* Enter exact NGN cost  |  Precise, honest  
* Upload photo — geotag captured automatically  |  Documentary  
* Write brief story (guided sentence starters) or record audio story  |  Expressive  
* Click 'Generate My Impact Statement' — DeepSeek creates statement in under 10 seconds  |  Surprised, delighted  
* Accept, regenerate, or edit impact statement  |  Ownership  
* Set deadline (7–30 days) and review full summary before submitting  |  Committed, ready  
* Submit for review — 'Your need will be reviewed within 24 hours'  |  Hopeful  
* \[If 24 hours pass with zero pledges\]  WhatsApp nudge sent with pre-written share messages  |  Motivated to share

## **7.4  Backer Flow**

Emotional arc:  Discovery → Trust-building → Commitment → Satisfaction → Return

* Discovers need via WhatsApp, homepage, or the Impact Wall  |  Curious  
* Views listing card: photo, item, exact cost, progress bar, verification badge, vouch count  |  Assessing legitimacy  
* Clicks 'Back This Tradesperson' → registers/logs in via phone OTP  |  Committed  
* Views Trust Account Disclosure before paying  |  Reassured  
* Reviews Fee Breakdown: pledge amount, platform fee, processing fee, amount tradesperson receives  |  Transparent — no surprises  
* \[International backers\]  Sees estimated NGN at today's exchange rate  |  Confident  
* Pays via Paystack (local) or Stripe (international)  |  Smooth  
* Receives celebratory confirmation: 'Your pledge is helping \[Name\] get back to work\!'  |  Warm, satisfied  
* \[Day X\]  Receives milestone notification at 50%, 80%, and 100% funding  |  Invested in outcome  
* \[Post-funding\]  Receives notification: '\[Name\] submitted their proof-of-use update — see what your pledge enabled\!'  |  Closure — Temi's retention moment  
* Views update; sees 'Back Another Tradesperson' CTA; optionally shares to WhatsApp  |  Re-engaged, proud

## **7.5  Disbursement and Proof-of-Use**

Emotional arc:  Euphoric → Validated → Proud → Legacy

* Need reaches 100% funding or deadline with partial funding  |  Euphoric or deeply grateful  
* Tradesperson receives disbursement to bank account within 48 hours — WhatsApp confirmation sent  |  Relief, validation  
* Day 3 nudge: 'Have you bought your item yet? Share a photo with your backers — they are waiting to see what they enabled.'  |  Motivated  
* Tradesperson submits proof-of-use update: photo or video \+ guided caption  |  Proud, grateful  
* All backers notified via WhatsApp/SMS  |  Satisfied, closure  
* Proof-of-use submission screen prompts Impact Wall opt-in: 'Would you like your story to inspire others on the Impact Wall?'  |  Proud to be seen  
* \[If opted in\]  Story enters the admin moderation queue. On approval, the story appears on the public Impact Wall.  |  Recognised, legacy created  
* Tradesperson profile receives a permanent 'Delivered' badge — boosts visibility for future needs  |  Established, trusted

# **8\.  Technical Requirements**

## **8.1  Frontend**

| Concern | Specification | Research Basis |
| :---- | :---- | :---- |
| Framework | React.js (Next.js for SSR/SEO) | Performance requirement: \<3s load on 3G — Chukwuemeka persona |
| Styling | Tailwind CSS with custom design tokens | Design quality enforcement  |
| State Management | React Context API; Zustand for complex state | — |
| Forms | React Hook Form \+ Zod validation; one field per screen on mobile | UX Principles for Low-Literacy Users  |
| Progressive Disclosure | One question per screen on mobile onboarding | Emeka persona — visual navigation requirement |
| Visual Selectors | Icon \+ text label for all category/type selections — no bare dropdowns on mobile | Emeka persona — avoids complex navigation |
| WhatsApp Share | Native Web Share API \+ fallback deep links; Open Graph meta tags for rich preview | Ada and Yetunde journey maps — WhatsApp is primary distribution channel |
| Instagram Share | Open Graph \+ Twitter Card meta tags; 9:16 image generation for stories | Yetunde persona  |
| Image Upload | Supabase Storage; minimum 400x400px enforced; alt text required | Profile quality requirements  |
| Video Upload | Supabase Storage with signed URLs; max 90 seconds / 50 MB; server-side thumbnail generation | Impact Wall video support — Section 5.12 |
| Accessibility | WCAG 2.1 AA; ARIA labels; keyboard navigation | — |
| Performance | LCP \<2.5s, CLS \<0.1; lazy loading; code splitting; skeleton screens | Low-bandwidth requirement for Lagos/Anambra users |
| PWA | Service worker and manifest from launch | All personas use Android and IOS  smartphones  |

## **8.2  Backend**

| Concern | Specification | Research Basis |
| :---- | :---- | :---- |
| Authentication | Supabase Auth — OTP via phone (Twilio); email optional | Phone-first registration — Emeka, Yanny cannot rely on email |
| AI Integration | DeepSeek API for impact statements; trade-specific prompt engineering layer | AI is 'a necessity not a feature' — Emeka persona |
| Identity Verification | Dojah or Prembly API for NIN/BVN lookup and selfie face match — required only for Level 2+ or needs over NGN 50,000 | Verification friction rule  |
| Notifications | SMS via Termii (default); WhatsApp via Twilio Business API; email via SendGrid (optional) | Emeka: 'If the platform only notifies via email, he will miss it' |
| Payment — Local | Paystack for Nigerian bank transfer, USSD, Naira card | All survey respondents are Nigeria-based |
| Payment — International | Stripe for diaspora backers | Chukwuemeka persona — international payment non-negotiable |
| Escrow | Paystack escrow or trust account; funds released upon completion or deadline | Trust Account Disclosure  |
| Media Storage | Supabase Storage with signed URLs; CDN delivery for Impact Wall; private buckets for all user media | NDPR compliance; Impact Wall performance — Section 5.12 |
| Social Share Cards | Server-side image generation (Vercel OG / Sharp) for WhatsApp and Instagram cards |  |
| Search | Supabase Full-Text Search (tsvector) for keyword queries | Browse discovery requirement |
| Rate Limiting | Upstash Redis — vouch creation, listing submission, OTP requests | Fraud prevention |
| Background Jobs | Supabase Edge Functions: badge recalculation, deadline checks, proof-of-use nudges (Day 3, 7, 14), zero-pledge nudge, Impact Wall moderation queue processing |  |
| Hosting | Vercel — automatic deployments from GitHub main | — |

## **8.3  Database Schema (Supabase / PostgreSQL)**

## 

| Table | Key Fields | Notes |
| :---- | :---- | :---- |
| users | id, phone, email (optional), name, role, created\_at | Phone is the primary identifier — email is optional |
| profiles | user\_id, trade\_category, location\_lga, location\_state, story, photo\_url, badge\_level, delivered\_count | delivered\_count drives the 'Delivered' badge on the profile |
| needs | id, profile\_id, item\_name, item\_cost, photo\_url, story, impact\_statement, status, deadline, funded\_amount, proof\_photo\_url, proof\_video\_url, proof\_caption, proof\_submitted\_at | Proof fields and video URL included from the start — not deferred |
| pledges | id, need\_id, backer\_user\_id, amount, message, created\_at, fee\_breakdown\_json | fee\_breakdown\_json stores displayed fee at time of pledge |
| vouches | id, voucher\_user\_id, recipient\_profile\_id, relationship\_type, duration\_years, statement, created\_at | Unique constraint: one vouch per user-pair |
| verifications | id, profile\_id, nin\_hash, bvn\_hash, selfie\_match\_score, verified\_at, provider | NIN/BVN stored as one-way SHA-256 hash with salt — never plaintext |
| impact\_wall\_submissions | id, need\_id, photo\_url, video\_url, caption, opted\_in\_at, moderation\_status, moderated\_by, published\_at | Separate table tracking opt-in, moderation state, and publication for Impact Wall |
| notifications | id, user\_id, type, channel, message, read, created\_at | channel enum: sms / whatsapp / email |
| milestones | id, need\_id, milestone\_pct, triggered\_at, notified | Tracks 50/80/100% notifications per need |
| share\_cards | id, need\_id, format, image\_url, created\_at | format enum: whatsapp\_16\_9 / instagram\_9\_16 |
| reports | id, reporter\_user\_id, need\_id, reason, status, created\_at | Moderation queue for flagged listings |

# **9\.  Verification Model**

The BuildBridge verification model is a five-layer progressive system — more rigorous than GoFundMe and Fundly at the pre-listing stage, comparable to GiveSendGo in its commitment to human review before disbursement, and unique in its community vouching and local identity system integration.

## **9.1  Five-Layer Verification Stack**

| Layer | Method | Required For | What It Resolves |
| :---- | :---- | :---- | :---- |
| 1 — Identity Anchor | Phone OTP (mandatory for all) | All listings — Level 0 | One account per number; confirms a real person |
| 2 — Business Existence | Geotagged photo of stall/workspace \+ trade description | Level 1+ (3 vouches unlock) | Proves real business activity without formal documents |
| 3 — Community Vouching | Minimum 2 vouchers at Level 1; escalating requirements above | All levels above 0 | Community trust replaces institutional verification |
| 4 — Identity API | NIN or BVN check via Dojah/Prembly \+ selfie face match | All levels (Level 0+) | Hard identity anchoring for all listings from the start |
| 5 — Human Review | Admin campaign review before disbursement; 'Delivered' badge; fraud monitoring | Every disbursement | Closes the loop; builds a progressive trust record |

## **9.2  Fraud Prevention Mechanisms**

* One account per phone number — enforced at registration  
* One account per NIN/BVN   
* Vouch velocity: maximum 5 vouches given per account per month  
* New account cooling period: accounts under 30 days old cannot vouch for others  
* Network graph analysis: automated detection of closed-loop vouching circles (A vouches B, B vouches C, C vouches A) — flagged for admin review  
* Listing photo reverse image search (Google Vision API) for stock photo detection  
* Geolocation verification: need listing location cross-checked against profile LGA  
* Proof-of-use gate: no disbursement for repeat listings if a previous proof-of-use update was never submitted

# **10\.  Security and Compliance**

## **10.1  Data Security**

* All data in transit encrypted via TLS 1.3 (Vercel and Supabase enforced)  
* All data at rest encrypted via Supabase AES-256  
* NIN/BVN stored as one-way SHA-256 hash with salt — never stored in plaintext  
* Profile photos and videos in private Supabase Storage buckets with signed URLs; CDN delivery for Impact Wall content  
* Row-Level Security (RLS) on all Supabase tables — users can access only their own records  
* Admin access via a separate portal with mandatory 2FA

## **10.2  NDPR and Privacy Compliance**

* Privacy Policy and Terms of Service reviewed by a Nigerian data protection specialist before launch  
* Explicit consent at registration; right to access and right to erasure supported  
* Data retention: 24-month deletion policy for inactive accounts  
* Data Processing Agreements (DPAs) in place with all processors: Supabase, Dojah/Prembly, Twilio, SendGrid, Paystack, Stripe  
* Cookie consent banner on first visit

## **10.3  Payment Security**

* All payment processing via PCI-DSS compliant Paystack and Stripe  
* Escrow model: pledges held by a licensed payment institution — not commingled with BuildBridge operational funds  
* Disbursement SLA: funds released to tradesperson within 48 hours of need completion  
* Trust Account Disclosure shown to every backer before their first pledge is confirmed

## **10.4  Authentication Security**

* OTP-based phone authentication — 5-minute expiry, maximum 5 attempts per hour  
* JWT tokens with 1-hour expiry; refresh tokens rotated on each use  
* Account lockout after 10 failed login attempts in 30 minutes  
* Suspicious login detection: logins from new devices or locations are flagged for review

# **11\.  Metrics of Success**

## **11.1  Leading Indicators — Weekly Behaviour**

| Metric | Persona | Week 4 Target | Why It Matters |
| :---- | :---- | :---- | :---- |
| % of tradesperson onboarding flows completed without external help | Emeka (TP-02) | 70% | Validates low-literacy UX design |
| % of needs that receive a first pledge within 24 hours | Ada (TP-01) | 50% | Validates early momentum feature — 48hr boost |
| WhatsApp share rate from listing creation (within 1 hour of going live) | Yetunde (TP-03) | 60% | WhatsApp is primary distribution — low share rate \= distribution failure |
| % of backers who add a personal message with their pledge | Temi (BP-01) | 30% | Emotional engagement signal — higher \= stronger community |
| Impact statement acceptance rate (accepted without regeneration) | Emeka (TP-02) | 60% | AI quality proxy — low rate signals poor prompt engineering |
| Proof-of-use update submission rate within 14 days of funding | Temi (BP-01) | 90% | Retention-critical — must stay above 90% or backer return behaviour collapses |
| Impact Wall opt-in rate at proof-of-use submission screen | All tradespeople | 40% | Validates Impact Wall content pipeline and tradesperson pride in being showcased |

## **11.2  Lagging Indicators — Monthly Outcomes**

| Metric | Month 3 Target | 6-Month Target |
| :---- | :---- | :---- |
| Verified tradesperson profiles | 500 | 2,000 |
| Needs 100% funded | 120 | 600 |
| Total NGN pledged | NGN 5 million | NGN 25 million |
| Registered backers | 1,000 | 5,000 |
| Diaspora backers (international IP) | 100 | 500 |
| Backers returning for a second pledge | 30% | 50% |
| Net Promoter Score | 40 | 55 |
| Listing fraud rate | \<2% | \<1% |
| Platform uptime | 99.5% | 99.9% |
| Average time from listing to first pledge | \<48 hours | \<24 hours |
| Impact Wall stories published | 30 | 150 |

# **12\.  Risks and Mitigations**

| Risk | Likelihood | Impact | Mitigation |
| :---- | :---- | :---- | :---- |
| Tradesperson drops off when asked for ID | High | High | NIN/BVN required at all levels. Mitigation through: guided verification flow with clear trust-building messaging, visual step-by-step progress, WhatsApp support, and community vouching to complement identity verification. |
| Zero pledges in first 24 hours causes abandonment | High | High | 48-hour visibility boost \+ 24-hour WhatsApp nudge with pre-written share messages automatically triggered. |
| Backers do not return because there is no post-funding closure | High | High | Proof-of-use moved to MVP. Impact Feed \+ Impact Wall added. Backers are notified when an update is posted. |
| Shame/charity language alienates tradesperson users | High | High | Global language replacement is enforced throughout all sections, flows, and UI copy. Language standard in Section 1.4. |
| Fraudulent vouching circles game the badge system | High | High | Vouch velocity limit (5/month). 30-day account cooling period. Automated network graph analysis for ring detection. |
| Low digital literacy prevents onboarding completion | High | Medium | Visual-first UX, progressive disclosure, audio option, explainer carousel, and Help page with WhatsApp support. |
| WhatsApp share card renders broken — backer does not share | Medium | High | Server-side Open Graph image generation (Vercel OG / Sharp) specified in technical requirements. |
| Diaspora backers cannot pay via Paystack | Medium | High | Stripe integrated as an international payment fallback. FX transparency shown before pledge. |
| Post-funding update not submitted — backers distrust platform | Medium | High | Day 3/7/14 nudges. Non-submission triggers admin review. Future needs require manual approval. |
| Impact Wall is thin at launch — insufficient social proof | Medium | Medium | Seed Impact Wall with 10–20 beta tradesperson stories before public launch. Opt-in prompt is prominent at proof-of-use. |
| NDPR regulatory action | Medium | High | Full legal review before launch. DPAs signed with all processors. Data deletion policy documented. |
| Crowdr launches trade-specific verification before BuildBridge | Low | High | Speed to market. Community anchor partnerships locked before launch. Proof-of-use differentiator shipped at MVP. |

# **13\.  Future Features and Roadmap**

The following features are deferred from MVP with documented rationale. Each deferral corresponds to a real identified user need — the deferral is a sequencing decision, not a dismissal.

| Phase | Timeline | Feature | Rationale |
| :---- | :---- | :---- | :---- |
| Phase 2 | 3–6 months | Diaspora nomination flow ('Nominate a tradesperson in your community') | Requires diaspora user base \>100 active users to have network effect |
| Phase 2 | 3–6 months | Instagram photo import during onboarding | Requires Instagram API partnership; lower priority vs. core listing flow |
| Phase 2 | 3–6 months | Saved Needs / Bookmark feature | Relevant after 1,000+ registered backers when browse volume increases |
| Phase 2 | 3–6 months | Corporate / CSR Portal with impact reports | Requires dedicated institutional onboarding flow and reporting engine |
| Phase 2 | 3–6 months | Local language support (Yoruba, Hausa, Igbo) | AI translation quality must be validated; legal review of translated terms required |
| Phase 2 | 3–6 months | Backer testimonials on the Impact Wall | Requires backer consent flow; meaningful when Impact Wall reaches 50+ stories |
| Phase 2 | 3–6 months | Milestone-locked disbursement option (pay in tranches) | Complex escrow logic; relevant for needs over NGN 200,000 |
| Phase 3 | 6–12 months | Native iOS and Android app | PWA sufficient for MVP; native app requires dedicated investment |
| Phase 3 | 6–12 months | Creditworthiness scoring layer for formal lending referrals | Requires at least 12 months of platform behaviour data |
| Phase 3 | 6–12 months | Pan-African expansion (Ghana, Kenya) | Nigeria proof-of-concept must be established before expansion |
| Phase 4 | 18+ months | BuildBridge Foundation (grant fund for the most vulnerable tradespeople) | Requires endowment; viable only after platform revenue is established |

# **14\.  Open Questions and Assumptions**

## **14.1  Decisions Not Yet Grounded in Research**

* Exact platform fee percentage — not specified. Assumption: competitive with or below NaijaFund's 7%. Requires pricing research before MVP launch.  
* Disbursement timeline — 48 hours assumed based on Paystack standard. Not validated against tradesperson expectations. Recommendation: test with 5 tradespeople before launch.  
* Audio story transcription quality — DeepSeek transcription quality for Nigerian pidgin and accented English has not been validated. Recommendation: conduct 3 pilot recordings before building.  
* WhatsApp Business API availability — Twilio requires Meta approval (2–6 weeks). Fallback: standard SMS only via Termii for MVP if approval is delayed.  
* Impact Wall seeding strategy — the number of pilot stories needed before public launch to generate meaningful social proof has not been formally tested. Target is 10–20.

## **14.2  Assumptions Requiring Future Validation**

* Primary 6 literacy level: research personas suggest low literacy, but reading level was not formally measured. Recommend a Cloze test on onboarding copy before launch.  
* WhatsApp as primary distribution: validated by all 5 personas but none of the 6 UX survey respondents reported sharing fundraising content on WhatsApp. The assumption holds but requires monitoring in the first 30 days.  
* 48-hour visibility boost efficacy: no benchmark data exists on whether visibility boosts reduce the zero-pledge rate. Monitor closely in the first 30 days and adjust boost duration if needed.  
* NIN/BVN under NGN 50,000 threshold: derived from the badge tier system. Has not been validated against actual fraud risk by amount. Recommend reviewing after the first 200 listings.  
* Impact Wall opt-in rate: targeted at 40% MVP. Actual tradesperson willingness to appear in a public multimedia showcase is untested. If rate falls below 25%, revise opt-in prompt copy and placement.

## **14.3  Recommended Follow-Up Research**

* Moderated usability test: 5 tradesperson participants (including 2 low-literacy) completing the full onboarding and listing creation flow — specifically testing audio story, visual selectors, and preview screen  
* Backer trust survey: 20 backers asked to rate trust signals and identify what prevented them from backing a specific listing  
* Market association partnership research: structured interviews with 5 association chairs (Chidi persona) to validate partnership MOU structure  
* Diaspora backer survey: 10 Nigerian diaspora individuals asked about current informal remittance behaviour and BuildBridge value proposition  
* Impact Wall pilot: recruit 10–20 beta tradespeople to submit proof-of-use updates before public launch to seed the Impact Wall with authentic multimedia stories

