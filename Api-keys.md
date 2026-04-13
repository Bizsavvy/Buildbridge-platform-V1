

# Integration Credentials & Service Logic

This document provides the specific API credentials and configuration details for the BuildBridge project. It acts as the primary resource for agents and developers to implement the server-side logic required for payments, identity verification, messaging, and media processing.


## 1. Service Credential Matrix

| Service | Category | Resource / Credential |
| :--- | :--- | :--- |
| **Paystack (Test Mode)** | Money | **Secret Key:** `sk_test_b9e4cba0eec252b1c22e5463c3a4e2bc15267acd`<br>**Public Key:** `pk_test_afef63d55cda95456c0594fc8dcfda84c36241ab` |
| **SmileID** | Identity | **Partner ID:** `[REDACTED/PENDING]`<br>**API Key:** `[REDACTED/PENDING]`<br>**Callback URL:** `[PROJECT_SERVER_URL]/api/verify/callback` |
| **Termii** | Chat | **API Key:** `TLZGLfdtGHpkhcMzFCaGNvBHpsjKfDamhGfuozmpVEfkBMytdeaYHcvyESonTx`<br>**Base URL:** `https://v3.api.termii.com` |
| **Cloudinary** | Media | **ENV_URL:** `cloudinary://464147753251489:6_A49D-J_s7WuyZxHSTMEeBhtkE@dwxcznxkt`<br>**API Key:** `464147753251489`<br>**API Secret:** `6_A49D-J_s7WuyZxHSTMEeBhtkE` |
| **Google Maps** | Location | **API Key:** `AIzaSyCdu67mqXpHdMeQmiq8vzz4cgWAXFPwE9o` |


## 2. Agent Usage Instructions

### Financial Operations (Paystack)
* **Testing Environment**: Use the provided `test` keys for all development. Do not attempt live transactions.
* **Logic Location**: The `Secret Key` must stay on the server. The `Public Key` is only for initializing the Paystack popup if a frontend-trigger is required, but verification must always be server-side.

### Identity Verification (Smile ID)
* **Trust Badges**: Once the `Partner ID` and `API Key` are finalized, the agent must trigger a KYC check (NIN/BVN) when a tradesperson attempts to "Go Live" with a Need.
* **Callback Handler**: The system must listen to the `Callback URL` to update the user's verification status asynchronously.

### Messaging (Termii)
* **OTP Delivery**: Use the `Base URL` and `API Key` to send WhatsApp/SMS OTPs.
* **Formatting**: Ensure all messages are routed through the `/sms/otp/send` endpoint using the specialized BuildBridge "Dignified" templates.

### Media Processing (Cloudinary)
* **Auto-Optimization**: Use the `CLOUDINARY_URL` to initialize the SDK. 
* **Required Tags**: Every upload must append `f_auto,q_auto` to the transformation string to ensure the "Low-Bandwidth" requirement of the project is met.

### Location Validation (Google Maps)
* **Restrictions**: The provided key has `Geocoding` and `Places` enabled. Use this to convert tradespeople's manual address entries into standardized coordinates for local discovery.


## 3. Security Guardrails
1. **Environment Variables**: These keys must be stored in a `.env` file. Never hardcode these strings directly into function logic.
2. **Secret Masking**: Do not log full API keys in the console or in debug logs.
3. **Thin Client Compliance**: No secret key (especially Paystack, Cloudinary Secret, or Termii) should ever be accessible to the browser's "Network" tab.

