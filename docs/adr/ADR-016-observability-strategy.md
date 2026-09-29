# ADR-016 - Logging, Monitoring, and Observability Strategy

## Status

Accepted

## Date

2026-09-23

## Decision Summary

Code Classic will use SLF4J, Logback, Spring Boot Actuator, Micrometer, and OpenTelemetry-compatible tracing for production observability.

## Context

The Technical BRD requires structured logs, request/trace IDs, health, metrics, JVM/database monitoring, R2 failure visibility, and future traceability across service boundaries. The initial system is a modular monolith, so a full distributed tracing platform is not required yet.

## Problem Statement

A production application must show whether it is healthy, slow, failing, or misconfigured. Code Classic needs useful evidence without introducing an observability platform larger than the application.

## Decision Drivers

- Diagnose production failures
- Low initial complexity
- Security and privacy
- Future trace continuity
- Learning value
- Operability

## Options Considered

### Selected Logging, Metrics, Health, and Trace Hooks

Provides application-level telemetry with the selected Spring stack. It requires consistent fields, dashboards, retention, and alert ownership.

### Logs Only

Easy to start but insufficient for latency, saturation, health, and trend detection.

### Full Distributed Observability Platform Initially

Could provide more capability but adds cost and operational complexity before multiple services exist.

## Decision

Use SLF4J/Logback for structured logs, Actuator for health and operational endpoints, Micrometer for metrics, and OpenTelemetry-compatible IDs/instrumentation. Capture request ID, trace ID, module, endpoint, status, duration, and safe user context. Do not expose sensitive health details publicly.

## Why This Decision Was Made

These tools are selected in the Technical BRD and provide an incremental path: useful monolith telemetry now, trace continuity later if services are extracted.

## Implementation Impact

- Add correlation IDs at request boundaries.
- Emit JSON or machine-readable production logs.
- Monitor HTTP errors/latency, JVM, database pool, auth failures, and R2 failures.
- Secure Actuator endpoints.
- Define dashboards, thresholds, owners, and runbooks.

## Architecture Flow

```text
Request -> Correlation/Trace Context -> Application Logs + Metrics + Health -> Operator/Alert
```

## Cost Considerations

Direct tool cost depends on the selected hosting/telemetry destination and is not finalized. Operational cost includes retention, dashboards, alert tuning, and privacy review. Development cost is instrumentation and consistent logging. Future cost grows with traffic, retention, and distributed traces.

## Learning Value

- **Beginner:** learns logs versus metrics versus traces.
- **Developer:** learns correlation IDs, health checks, and useful fields.
- **Production:** learns observability as feedback for operations, not decoration.

## Security Impact

Never log passwords, OAuth secrets, tokens, database credentials, R2 keys, or sensitive document content. Health endpoints must reveal enough for operations but not connection details or secrets.

## Performance and Scalability

Instrumentation must be bounded and asynchronous where appropriate. Metrics should be low-cardinality; user IDs and arbitrary URLs must not create unbounded metric labels. Full distributed tracing is deferred until service boundaries exist.

## Consequences

### Positive Consequences

- Faster diagnosis
- Measurable release behavior
- Future trace continuity
- Clear production learning

### Negative Consequences

- Telemetry needs storage and ownership
- Poor fields or high cardinality can increase cost
- Alerts require maintenance

### Trade-offs

The project accepts instrumentation and monitoring work to avoid operating a blind production system.

## Future Evolution

Add richer dashboards, tracing destinations, and service-level indicators when traffic or service extraction justifies them.

## Revisit Conditions

Revisit if telemetry cost, data volume, privacy requirements, incident frequency, or distributed deployment changes materially.

## Related ADRs

- ADR-002 - Modular Monolith as Initial Architecture
- ADR-013 - Managed Hosting for Spring Boot
- ADR-018 - CI/CD and Quality Gates
- ADR-024 - API Gateway and Service Communication

## References

- Technical BRD Sections 35-38 and 75
- Planning EPIC-00 and EPIC-11
