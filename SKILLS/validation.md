# Validation Rules

This document defines the server-side validation logic required to maintain the safety, trust, and data integrity of the BuildBridge platform.


## 1. Core Principles
* **Server-Side Authority**: Validation must occur server-side before any data becomes persistent.
* **Phone-First Identity**: Because BuildBridge is a phone-first platform, phone number validation is the primary security gate.
* **Dignity in Feedback**: Error messages must be actionable, respectful, and locally understandable.


## 2. Field-Specific Rules

### User & Authentication
* **Phone Numbers**: Must be normalized and match E.164 format (e.g., +234...) before storage.
* **Required Fields**: Profiles and "Need" listings must not be saved with empty required fields (Name, Trade, Location, Item, Cost).
* **Consent**: Submission must be rejected unless the explicit NDPR-compliant consent flag is true.

### "Need" Listings
* **Precise Costs**: Cost fields must accept only exact NGN amounts; vague ranges are prohibited.
* **Item Naming**: Must validate against a "vague category" filter; users are encouraged to name exact tools or materials (e.g., "Industrial Sewing Machine" instead of "Equipment").
* **Duplicate Prevention**: Handlers must check for duplicate active listings from the same user to prevent fraud.

### Vouching & Verification
* **Identity Lock**: Verification logic must reject NIN/BVN data that does not match the provided profile name.
* **Vouching Limits**: System must validate that a user is not vouching for themselves or exceeding community rate limits.

## 3. Financial Validation (Server-Side)
* **Integer Arithmetic**: All NGN values must be validated as integers (minor units/kobo) to prevent floating-point errors.
* **Fee Transparency**: The server must validate that the "Total Pledge" amount covers both the "Amount to Tradesperson" and the "Platform Fee" before initializing a payment session.