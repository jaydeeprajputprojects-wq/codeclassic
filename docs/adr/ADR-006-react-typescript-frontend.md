# ADR-006 - React and TypeScript Frontend

## Status

Accepted

## Date

2026-09-23

## Decision Summary

The Code Classic frontend will use React with TypeScript and Vite, organized by business feature.

## Context

The platform needs public browsing, authenticated blog workflows, admin screens, Jobs access control, courses, documents, forms, shareable URLs, responsive states, and API-driven server state. The Technical BRD explicitly selects React and TypeScript.

## Problem Statement

Code Classic needs a maintainable browser application that can support multiple feature areas without turning UI state, API calls, and authorization visibility into one large component structure.

## Decision Drivers

- Selected stack
- Feature-oriented organization
- Type safety
- API integration
- Responsive user journeys
- Testability
- Learning value

## Options Considered

### React with TypeScript

Supports component composition, feature organization, typed API models, and the selected testing approach. It requires decisions about state, routing, forms, and asynchronous data.

### React with JavaScript

Would reduce type setup but remove compile-time contracts useful for a growing multi-feature frontend.

### A Different Frontend Framework

Would conflict with the finalized Technical BRD and create a second learning/tooling direction without a project requirement.

## Decision

Use React + TypeScript + Vite, React Router, TanStack Query, React Hook Form, Zod, Tailwind CSS, and Lucide React as selected frontend tooling. Organize by `features`, with shared layout/UI components kept separate from feature behavior.

## Why This Decision Was Made

React and TypeScript support the required user journeys while keeping frontend contracts visible. TanStack Query handles server state; local UI state remains local rather than adding Redux without demonstrated need.

## Implementation Impact

- Routes map to public, authenticated, and admin journeys.
- Feature folders own API hooks and UI behavior.
- Typed DTOs mirror API contracts without treating UI visibility as security.
- Forms use schema validation and display server errors.
- Loading, empty, error, and unauthorized states are required.

## Architecture Flow

```text
Browser -> React Route -> Feature Component -> Typed API Client -> Spring Boot REST API
```

## Cost Considerations

The selected frontend tools have no project-specific licensing cost identified here. Development cost is reduced by a cohesive toolchain but includes TypeScript and async-state learning. Hosting cost is addressed separately in ADR-012. Future cost is primarily bundle, maintenance, and dependency-update work.

## Learning Value

- **Beginner:** learns components, routes, props, state, and typed data.
- **Developer:** learns server-state management, form validation, and API error handling.
- **Production:** sees why hidden UI controls cannot replace backend authorization.

## Security Impact

The frontend is not a security boundary. It may hide Jobs or admin controls for usability, but every API and resource check remains in Spring Boot. Tokens/cookies and sensitive configuration must not be exposed in bundles.

## Performance and Scalability

Use pagination, query caching where appropriate, lazy routes/assets, optimized images, and bounded API responses. Do not add client state infrastructure without evidence that local state and server-state tools are insufficient.

## Consequences

### Positive Consequences

- Feature-oriented UI structure
- Typed API contracts
- Strong form and async-state patterns
- Selected stack aligns with roadmap

### Negative Consequences

- Type definitions require maintenance
- Several focused libraries must be used consistently
- React does not prescribe all architecture decisions

### Trade-offs

The project accepts frontend tooling decisions and TypeScript learning cost for maintainability and safer API integration.

## Future Evolution

Add shared design primitives and performance optimizations as usage grows. Keep feature boundaries so a future route or service change does not require a global rewrite.

## Revisit Conditions

Revisit if measured bundle/performance problems, team capability, or a major product interaction model makes the selected frontend structure inadequate.

## Related ADRs

- ADR-015 - REST API and Versioning Strategy
- ADR-012 - Cloudflare Pages for Frontend Hosting
- ADR-017 - Testing Strategy

## References

- Technical BRD Sections 7, 12-13
- Planning EPIC-02, EPIC-05, and EPIC-07
