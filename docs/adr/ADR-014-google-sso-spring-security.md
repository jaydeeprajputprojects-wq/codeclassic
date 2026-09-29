# ADR-014 - Google SSO and Spring Security

## Status

Accepted

## Date

2026-09-23

## Decision Summary

Google SSO is the initial authentication mechanism, and Spring Security is the backend authority for authentication, roles, and resource authorization.

## Context

The BRD defines Public User, Authenticated User, and Super Admin roles. It requires Google SSO, email-based identity, Jobs access restriction, user-owned blogs, protected documents, and admin-only operations. The frontend must not be treated as a security boundary.

## Problem Statement

Code Classic needs trustworthy user identity and server-side authorization without building a password system in Phase 1.

## Decision Drivers

- BRD authentication requirement
- Identity verification
- Backend authorization
- Low initial identity complexity
- Learning value
- Future provider extensibility

## Options Considered

### Google SSO with Spring Security

Delegates initial identity authentication to Google and uses Spring Security to establish the application security context. It introduces OAuth configuration and provider dependency.

### Local Username/Password Authentication

Would require password storage, reset, verification, abuse controls, and credential security that are outside the initial requirement.

### Multiple Providers Initially

Could improve flexibility but adds account-linking and support complexity without a Phase 1 need.

## Decision

Use Google SSO initially. Persist the verified email as the user identifier and profile name as display data. Use Spring Security for endpoint roles (`USER`, `SUPER_ADMIN`), ownership checks, access levels, and admin operations. The client may show/hide controls but cannot authorize access.

## Why This Decision Was Made

It matches the BRD and avoids implementing a password system. The separation between authentication and authorization teaches a critical production concept: Google verifies identity, while Code Classic decides what that identity may do.

## Implementation Impact

- Configure OAuth client and approved redirects.
- Persist/update identity after verified login.
- Derive blog authorship from security context.
- Protect Jobs, documents, comments, likes, admin APIs, and shared URLs.
- Handle logout, expiry, callback failure, CORS, and secure token/cookie storage.

## Architecture Flow

```text
React -> Google Login -> Spring Security Callback -> Identity Module -> PostgreSQL
                                            -> Security Context -> API Authorization
```

## Cost Considerations

No exact provider pricing is claimed here; current Google and hosting terms must be verified. Operational cost includes OAuth client configuration, redirect management, incident handling, and provider dependency. Development cost is lower than building password auth but includes security review. Future cost may include additional providers or account linking.

## Learning Value

- **Beginner:** distinguishes authentication from authorization.
- **Developer:** learns OAuth flow, security context, roles, ownership, and protected APIs.
- **Production:** sees why identity from a request payload is not trustworthy.

## Security Impact

This ADR is security-critical. Validate OAuth state/callbacks, restrict redirects, protect secrets, enforce authorization on the backend, avoid sensitive logs, and return sanitized errors. Shared URLs must follow the same checks as normal API requests.

## Performance and Scalability

Authentication calls and session/token validation should be bounded. User data is stored locally so each business request need not depend on profile lookup. Rate limiting may be added for authentication endpoints if abuse evidence requires it.

## Consequences

### Positive Consequences

- Meets the initial authentication requirement
- Avoids password handling
- Clear backend security boundary
- Strong learning value

### Negative Consequences

- Dependency on Google availability and policy
- OAuth configuration can be error-prone
- Provider identity/account changes need handling

### Trade-offs

The project accepts provider dependence and OAuth complexity in exchange for lower credential risk and faster Phase 1 delivery.

## Future Evolution

Add providers or local authentication only through a new decision with an account-linking and migration plan. Keep internal identity separate from provider-specific fields.

## Revisit Conditions

Revisit if Google policy/availability changes, users require other providers, enterprise SSO becomes a requirement, or account recovery/support needs change.

## Related ADRs

- ADR-004 - Java as Backend Language
- ADR-005 - Spring Boot as Backend Framework
- ADR-010 - Cloudflare R2 for Object Storage
- ADR-015 - REST API and Versioning Strategy

## References

- BRD Sections 5-10, 13-14, 64, 70
- Technical BRD Sections 18-19, 42-44
