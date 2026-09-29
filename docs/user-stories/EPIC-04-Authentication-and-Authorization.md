# EPIC-04: Authentication and Authorization

**Backlog ID:** EPIC-04  
**Issue type:** Epic (`type:epic`)  
**Parent:** None  
**Depends on:** EPIC-03

**Roadmap stage:** Stage 4 - Authentication  
**Outcome:** Google SSO, persisted identity, roles, protected routes, resource authorization, and access levels are enforced server-side.  
**Dependencies:** EPIC-03  
**Enables:** EPIC-05, EPIC-06, EPIC-07, EPIC-08, EPIC-09, EPIC-10

## Epic Goal

Make the backend the authoritative security boundary for public, authenticated, and Super Admin behavior.

## Features

| ID | Feature | Result / completion evidence | Related user stories |
|---|---|---|---|
| F04.1 | Google SSO | Google sign-in and callback establish a verified application identity. | US-04.1 |
| F04.2 | Identity persistence | First login creates one user; later login updates permitted profile data. | US-04.1 |
| F04.3 | Roles | USER and SUPER_ADMIN API permissions are covered by positive and negative tests. | US-04.2 |
| F04.4 | Session/token handling | Session expiry and logout remove authenticated access. | US-04.1 |
| F04.5 | Resource authorization | Ownership, status, access-level, and admin rules are enforced server-side. | US-04.2 |
| F04.6 | Frontend auth state | Navigation and routes reflect capabilities while APIs remain authoritative. | US-04.2 |

Every feature issue has parent `EPIC-04`; user-story parent IDs are stated below.

## User Stories

### US-04.1: Sign In with Google

**Backlog ID:** US-04.1  
**Issue type:** User Story (`type:user-story`)  
**Parent:** F04.1  
**Related feature IDs:** F04.2, F04.4  
**Depends on:** EPIC-03

#### Description

As a visitor, I want to sign in with Google so that I can access authenticated features without a separate Code Classic password.

#### Action Items

- Establish OAuth login/callback and resolve the verified provider identity to an internal user.
- Protect browser authentication state and implement expiry/logout behavior.
- Provide clear frontend states for login, success, expiry, and failure.

#### Tasks

- [ ] Register/configure only the approved OAuth redirect URIs.
- [ ] Configure Spring Security OAuth using the hosting model's secure cookie/session approach.
- [ ] Persist users with stable unique email and safely update profile name.
- [ ] Add login/logout/session-expiry UI and backend/API tests.
- [ ] Confirm OAuth client secrets remain server-side and are absent from logs.

#### Implementation Steps

1. Register OAuth client with approved redirect URIs.
2. Configure Spring Security OAuth2 client/resource handling and secure cookies/tokens according to hosting model.
3. Map Google subject/email/profile name to an internal user record.
4. Create or update user on first successful login.
5. Add login, logout, expired-session, and failure handling in React.

#### Acceptance Criteria
- Only configured Google redirect origins are accepted.
- User identity is derived from the verified security context.
- Email is unique and stable; profile name can update safely.
- Logout clears the application session/token state.
- OAuth client secret is never sent to the browser or logged.

#### Test Scenarios
- First login creates a user.
- Existing user login does not create a duplicate.
- Invalid state/redirect/callback is rejected.
- Expired authentication returns 401 and the UI offers login.
- Logout prevents access to protected APIs with the prior session.

### US-04.2: Enforce Roles and Content Access Levels

**Backlog ID:** US-04.2  
**Issue type:** User Story (`type:user-story`)  
**Parent:** F04.3  
**Related feature IDs:** F04.5, F04.6  
**Depends on:** US-04.1

#### Description

As a product owner, I want public, authenticated, and Super Admin capabilities protected consistently so that direct API calls cannot bypass UI access controls.

#### Action Items

- Define and enforce a backend access matrix for role, ownership, resource state, and access level.
- Align frontend routes/navigation with the same capability model without trusting the client.

#### Tasks

- [ ] Define `PUBLIC`, `AUTHENTICATED_USER`, and `SUPER_ADMIN` access rules for current resources.
- [ ] Apply authorization at endpoint and owning-service boundaries.
- [ ] Add ID-tampering, ownership, shared-URL, and role-negative tests.
- [ ] Add route guards and capability-aware navigation, retaining backend enforcement.

#### Implementation Steps

1. Define `PUBLIC`, `AUTHENTICATED_USER`, and `SUPER_ADMIN` access policy.
2. Add endpoint and service-level authorization.
3. Add resource ownership checks for user blogs, comments, and likes.
4. Ensure shared URLs resolve through the same authorization path.
5. Add frontend route guards and capability-aware navigation.

#### Acceptance Criteria
- Public users can access only public content.
- Authenticated users can access restricted content and Jobs, but not admin operations.
- Only Super Admin can approve blogs, manage documents/courses/jobs, and moderate comments.
- Draft, pending, and rejected blogs are not public.
- Authorization cannot be bypassed by changing IDs, roles, or request payloads.

#### Test Scenarios
- Anonymous request to restricted resource returns 401.
- Authenticated non-admin request to admin API returns 403.
- User A cannot read/edit User B's draft.
- Shared restricted blog requires authentication.
- Public navigation hides Jobs, but direct Jobs API access is also rejected.

### US-04.3: Protect Secrets and Security Configuration

**Backlog ID:** US-04.3  
**Issue type:** User Story (`type:user-story`)  
**Parent:** F04.4  
**Related feature IDs:** F04.1, F04.5  
**Depends on:** US-04.1

#### Description

As an operator, I want authentication and application secrets configured safely so that production credentials and user data are not exposed.

#### Action Items

- Externalize credentials and constrain browser/API trust configuration.
- Automate security checks and document safe configuration/rotation practices.

#### Tasks

- [ ] Move OAuth/database/R2 secrets to the approved environment or secret manager.
- [ ] Restrict CORS and configure secure headers, transport, and session/CSRF policy for the selected auth flow.
- [ ] Add required dependency and secret scans to CI.
- [ ] Document production/local profile differences and credential rotation.

#### Implementation Steps

1. Move OAuth/database/R2 secrets to environment/secret management.
2. Restrict CORS to known frontend origins.
3. Configure secure headers, HTTPS, cookie/token policy, and CSRF approach appropriate to the auth flow.
4. Add dependency and secret scanning to CI.
5. Document key rotation and incident response basics.

#### Acceptance Criteria
- No wildcard credentialed CORS configuration exists.
- Secrets are absent from source, bundles, logs, and API responses.
- Security scans run in CI and produce actionable failures.
- Production profile differs safely from local profile.

#### Test Scenarios
- CORS rejects an unapproved origin.
- Browser bundle inspection finds no client secret.
- Secret scanning catches a test fixture secret pattern.
- Security headers and secure transport are present in production responses.

## Release Gate

- [ ] Google SSO works in production configuration.
- [ ] USER and SUPER_ADMIN authorization tests pass.
- [ ] Public/restricted/admin-only access matrix is automated.
- [ ] Ownership and shared URL bypass tests pass.
- [ ] Security and dependency scans pass or have documented accepted findings.
