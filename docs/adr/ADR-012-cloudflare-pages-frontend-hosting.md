# ADR-012 - Cloudflare Pages for Frontend Hosting

## Status

Accepted

## Date

2026-09-23

## Decision Summary

The React frontend will be built and hosted on Cloudflare Pages.

## Context

The Technical BRD selects React, Vite, Cloudflare Pages, and Cloudflare DNS/CDN. The frontend is a static build that needs reliable HTTPS delivery, environment-specific API configuration, and integration with the managed Spring Boot API.

## Problem Statement

Code Classic needs low-maintenance frontend hosting that supports repeatable builds, custom domain delivery, and a clear separation from backend deployment.

## Decision Drivers

- Static React build fit
- Low operational overhead
- Cloudflare integration
- CI/CD simplicity
- Cost awareness
- Production learning value

## Options Considered

### Cloudflare Pages

Serves the Vite build through the selected edge platform and separates frontend releases from backend releases. Build configuration and environment variables must be managed carefully.

### Hosting Frontend on the Backend

Could simplify deployment to one artifact but couples frontend and backend releases and loses the intended Pages architecture.

### Self-Managed Static Server

Adds server patching, TLS, scaling, and deployment work without a current need.

## Decision

Deploy the React production build to Cloudflare Pages. The frontend owns static assets and browser routing; Spring Boot owns APIs, authentication, authorization, and business data.

## Why This Decision Was Made

The frontend is a static build and Cloudflare is already selected for DNS/CDN. Separate hosting supports incremental releases while keeping the browser/API contract explicit.

## Implementation Impact

- CI installs dependencies, runs tests, and builds the frontend.
- Production API base URL is environment-configured.
- SPA fallback routes are configured.
- CORS and authentication origin settings are aligned.
- No secrets are embedded in frontend environment variables.

## Architecture Flow

```text
Git Push -> CI Test/Build -> Cloudflare Pages -> Browser -> api.codeclassic.com
```

## Cost Considerations

Current Pages pricing, build limits, and usage terms must be verified before budgeting. Operational cost is build configuration, domain setup, cache behavior, and release troubleshooting. Development cost is low for static delivery. Future cost depends on traffic and build requirements.

## Learning Value

- **Beginner:** learns build output versus backend runtime.
- **Developer:** learns environment configuration, SPA routing, and API origins.
- **Production:** learns independent frontend deployment and cross-origin security.

## Security Impact

Frontend configuration is public. It must not contain OAuth client secrets, database credentials, R2 keys, or privileged tokens. Backend APIs enforce all permissions.

## Performance and Scalability

Edge delivery and asset caching support the initial workload. Bundle size, route loading, image behavior, and cache invalidation must be measured. Dynamic/private data is fetched from the API and not treated as static public content.

## Consequences

### Positive Consequences

- Simple static hosting
- Independent frontend releases
- Cloudflare integration
- Low server management

### Negative Consequences

- Frontend and backend deployments can become version-incompatible
- SPA/cache configuration needs care
- Provider coupling exists

### Trade-offs

The project accepts separate release coordination in exchange for a simple frontend hosting model.

## Future Evolution

Add preview environments or stricter release coordination if team size and deployment frequency require them. Keep API compatibility versioned.

## Revisit Conditions

Revisit if frontend runtime rendering, compliance, build limits, cost, or deployment coupling makes Pages unsuitable.

## Related ADRs

- ADR-006 - React and TypeScript Frontend
- ADR-011 - Cloudflare for DNS, CDN, and Edge
- ADR-015 - REST API and Versioning Strategy
- ADR-018 - CI/CD and Quality Gates

## References

- Technical BRD Sections 5-7, 12, 48, 53-55
