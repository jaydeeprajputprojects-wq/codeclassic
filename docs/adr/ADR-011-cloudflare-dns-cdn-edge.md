# ADR-011 - Cloudflare for DNS, CDN, and Edge

## Status

Accepted

## Date

2026-09-23

## Decision Summary

Cloudflare will provide DNS, HTTPS/SSL, CDN/edge delivery, and edge protection for Code Classic.

## Context

The Technical BRD defines Cloudflare as the edge layer for `codeclassic.com`, the frontend, the API domain, and R2-related delivery. The initial system needs secure public routing without adding a separate gateway.

## Problem Statement

Code Classic needs dependable domain routing, HTTPS, frontend asset delivery, and basic edge protection while keeping infrastructure simple and low cost for the initial workload.

## Decision Drivers

- Existing architecture selection
- DNS and TLS centralization
- CDN delivery
- Edge security
- Operational simplicity
- Cost awareness

## Options Considered

### Cloudflare

Centralizes DNS, HTTPS, CDN, and edge controls around the selected hosting architecture. Configuration still requires careful origin, cache, and security rules.

### Provider-Specific DNS/CDN Separately

Could work but would add another operational boundary and reduce the benefit of the selected Cloudflare architecture.

### Self-Managed Proxy/Gateway

Would provide control but adds a server, patching, availability, and routing responsibility not justified initially.

## Decision

Use Cloudflare for DNS, TLS/HTTPS, CDN where appropriate, and edge protection. Cloudflare does not replace backend authorization, application validation, or business logic.

## Why This Decision Was Made

The Technical BRD already selects Cloudflare and needs a low-management path for the initial deployment. Centralizing edge concerns helps learners see the distinction between edge delivery and application security.

## Implementation Impact

- Configure frontend and API DNS records.
- Enforce HTTPS and approved origins.
- Configure CORS separately in Spring Boot.
- Cache only safe public assets/content.
- Do not cache personalized or restricted responses incorrectly.
- Verify health, origin routing, and invalidation behavior.

## Architecture Flow

```text
User -> Cloudflare DNS/TLS/CDN/Edge -> Cloudflare Pages or API Origin -> Application
```

## Cost Considerations

Current Cloudflare pricing and plan limits must be verified before final budgeting. Operational cost is configuration, DNS ownership, cache rules, and incident diagnosis. Development cost is lower than self-managing edge infrastructure but includes understanding cache and origin behavior. Future cost depends on traffic, rules, and storage access.

## Learning Value

- **Beginner:** understands DNS, HTTPS, CDN, and origin concepts.
- **Developer:** learns why CORS, caching, and routing are separate from APIs.
- **Production:** learns how edge configuration can improve delivery but also expose stale/private data if misconfigured.

## Security Impact

HTTPS and edge protection reduce transport and common edge risks but do not authorize users. Cache rules must never expose restricted blogs, jobs, documents, or admin responses. Origin secrets and admin endpoints remain protected.

## Performance and Scalability

Static assets and safe public content can benefit from edge delivery. Application database performance remains the backend responsibility. Redis, a gateway, and Kubernetes are not added as substitutes for basic edge delivery.

## Consequences

### Positive Consequences

- One edge provider for core routing
- HTTPS and CDN path are clear
- Lower infrastructure management
- Useful production learning

### Negative Consequences

- Provider configuration becomes operational knowledge
- Cache mistakes can affect visibility
- Provider limits and pricing must be monitored

### Trade-offs

The project accepts provider coupling in exchange for simple, integrated edge operations.

## Future Evolution

Add more advanced rules, origin strategies, or a gateway only when traffic, security, or service extraction creates a requirement.

## Revisit Conditions

Revisit if provider availability, cost, compliance, routing, or traffic requirements change materially.

## Related ADRs

- ADR-010 - Cloudflare R2 for Object Storage
- ADR-012 - Cloudflare Pages for Frontend Hosting
- ADR-013 - Managed Hosting for Spring Boot
- ADR-014 - Google SSO and Spring Security

## References

- Technical BRD Sections 5-6, 43-44, 53-55
