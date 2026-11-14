# Session 05 — Questions and Answers

## 1. What is authentication?

Authentication checks who the user is, for example by verifying a Firebase sign-in.

## 2. What is authorization?

Authorization decides what an authenticated identity is allowed to do. Signing in does not automatically make someone an admin.

## 3. Why verify an email address?

The project baseline requires email/password users to prove they can access the address before they use authenticated features. Until verified, they should remain in a pending state.

## 4. What happens after a user clicks the verification email?

The app must refresh or reload Firebase's user state/token, check that verification succeeded, then allow permitted authenticated access.

## 5. Can any Google account use the authenticated features?

Only if Firebase confirms its provider email is verified, as required by the project baseline.

## 6. How does password reset work?

The user requests a reset email, opens Firebase's link, chooses a new password, and then signs in. The app should use generic confirmation text that does not reveal whether the address exists.

## 7. Is Firebase browser configuration the same as an Admin SDK private key?

No. Browser configuration identifies the Firebase project and is visible in the client. A service-account key is privileged and must never be shipped in the frontend.

## Practice: A user is signed in but unverified. Which pages may they access?

**Answer:** Public published blogs and the verification/resend flow. They must not access the private profile or admin features.

## Troubleshooting: Verification succeeded but the app still says “unverified.” What should you check?

Refresh/reload the Firebase user and ID token, and confirm the verification link completed for the same account.
