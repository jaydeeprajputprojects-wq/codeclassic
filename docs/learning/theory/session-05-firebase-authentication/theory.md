# Session 05 — Firebase Authentication

- **Roadmap phase:** Firebase and authentication
- **Prerequisite:** Session 1; shared frontend routes from Session 2
- **Learning status:** Planned; Firebase is not currently listed in the local app dependencies.

## What you will learn

- Explain authentication as “who are you?” and authorization as “what may you do?”
- Describe email/password and Google sign-in.
- Explain why email verification is required before authenticated app access.
- Describe a password-reset email flow.
- Understand loading, signed-out, signed-in, and verification-pending states.
- Keep Firebase browser configuration separate from privileged credentials.

## Identity and permission

**Authentication** checks a user's identity (kaun ho?). **Authorization** decides what that identity may do (kya kar sakte ho?). A successful login does not automatically make someone an administrator.

Firebase Authentication manages account identity. In the baseline, users can register with email/password or sign in with Google. Email/password accounts must verify their address before accessing authenticated features. Google access requires Firebase to report the provider email as verified.

## Verification flow

```text
Register → Firebase sends verification email → show pending screen
        → user opens link → refresh/check Firebase user → allow permitted app access
```

An unverified user can still read public published blogs and use the verification/resend flow. Do not show their private profile or admin UI. Refreshing the Firebase user/token after clicking the verification link matters because the browser may still hold old state.

## Password reset flow

The user enters an email address, Firebase sends a reset link, and the user chooses a new password. Confirmation wording should not reveal whether the address belongs to an account. This protects against account enumeration (guessing who has an account).

## Client configuration vs private keys

The Firebase web configuration identifies the project and is used by browser code. It is not the same as a service-account private key. Never put Admin SDK credentials or privileged keys in a React app. Access is protected with Authentication and Firestore Security Rules, not by hiding the browser configuration.

## Guided learning activity

1. Draw the registration and verification flow above.
2. Mark which pages an unverified user may see: public blog and verification instructions; not profile or admin.
3. Draw the password-reset steps without writing real email addresses or tokens into notes.
4. When implemented, test a new unverified account, a verified account, a verified Google account, logout, and reset link.
5. Inspect environment files and Git ignore rules before placing project configuration there.

## Common beginner mistakes

- **Login means admin:** no; admin authorization is separate and uses a trusted claim.
- **Showing private pages before verification:** block them until Firebase confirms verification.
- **Not refreshing after email verification:** the app can keep stale user state.
- **Putting a service-account key in Vite variables:** frontend variables become visible to browsers; never put privileged secrets there.
- **Confirming whether an email exists:** use generic reset confirmation.

## Recap

Firebase Authentication manages identity. Email/password access requires verification; verified Google identity is also required. Password reset is a separate email-link flow. Authentication alone does not grant admin permission.

**I can explain this if I can answer:** What is the difference between authentication and authorization? What can an unverified user access? Why refresh the user after verification?

## Sources and verification

- Sources: BRD and TDD authentication requirements; master execution plan Session 5.
- Current implementation check: Firebase is not yet included in `package.json` or verified in source.
