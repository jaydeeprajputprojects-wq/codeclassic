# ADR-010 - Cloudflare R2 for Object Storage

## Status

Accepted

## Date

2026-09-23

## Decision Summary

Cloudflare R2 will store blog images, learning documents, and future application objects; PostgreSQL will store their metadata.

## Context

The BRD requires blog images and documents, and the Technical BRD explicitly selects R2. Binary files should not be stored inside PostgreSQL, and restricted objects must not be permanently exposed through unrestricted URLs.

## Problem Statement

Code Classic needs durable object storage with server-controlled access for files while keeping relational metadata, business rules, and object bytes separate.

## Decision Drivers

- File/object fit
- Cost awareness
- Secure access
- Integration with Cloudflare
- Metadata/data separation
- Future extensibility

## Options Considered

### Cloudflare R2

Stores objects separately from PostgreSQL and integrates with the selected Cloudflare environment. Exact pricing depends on current provider terms and must be verified.

### Database Blob Storage

Keeps bytes in one system but increases database size, backup burden, and query/storage coupling.

### Unrestricted Public File URLs

Simple for delivery but violates restricted document/blog access requirements and makes authorization difficult.

## Decision

Use private R2 object paths such as `blogs/{blogId}/` and `documents/{documentId}/`. Spring Boot validates uploads, generates safe object keys, stores metadata in PostgreSQL, authorizes access, and provides short-lived access where required. R2 does not own business authorization.

## Why This Decision Was Made

R2 is selected in the Technical BRD for blog images and documents. The separation lets PostgreSQL manage ownership, status, access level, and metadata while R2 handles object bytes.

## Implementation Impact

- R2 credentials are server-side secrets.
- Upload validation covers count, type, size, and safe naming.
- Metadata is persisted only after successful storage.
- Restricted retrieval checks authentication/authorization first.
- Orphan cleanup and deletion behavior are documented and tested.

## Architecture Flow

```text
React -> Spring Boot authorization/validation -> R2 private object
                         |
                         -> PostgreSQL metadata
```

## Cost Considerations

Direct storage and operation pricing must be checked against current Cloudflare pricing before finalizing a budget. Operational cost includes credentials, cleanup, access expiry, and backup/recovery assumptions. Development cost includes multipart validation and failure handling. Future cost grows with object volume and access patterns.

## Learning Value

- **Beginner:** understands why files and metadata use different storage systems.
- **Developer:** learns multipart validation, object keys, and signed/temporary access.
- **Production:** learns that a storage URL is not an authorization decision.

## Security Impact

Private objects, server-side credentials, MIME/signature checks, safe object names, short-lived access, and backend authorization are required. Browser saving/screenshots cannot be completely prevented, and the BRD only requires no application-level download button.

## Performance and Scalability

Object delivery is better separated from relational queries and can use Cloudflare delivery patterns. Metadata listing remains paginated in PostgreSQL. Large files and upload timeouts must be bounded.

## Consequences

### Positive Consequences

- Keeps binaries out of PostgreSQL
- Supports images and documents
- Fits selected Cloudflare architecture
- Allows future object categories

### Negative Consequences

- Two systems must be kept consistent
- Orphan cleanup and failure recovery are required
- Access control spans application and storage

### Trade-offs

The project accepts distributed object/metadata failure handling for better file storage behavior and database health.

## Future Evolution

Add image optimization, lifecycle policies, or dedicated delivery behavior only when usage justifies it. Keep object metadata and authorization in the owning module.

## Revisit Conditions

Revisit if R2 availability, cost, compliance, file-size, access-control, or recovery requirements change materially.

## Related ADRs

- ADR-007 - PostgreSQL as Primary Database
- ADR-011 - Cloudflare for DNS, CDN, and Edge
- ADR-013 - Managed Hosting for Spring Boot
- ADR-014 - Google SSO and Spring Security

## References

- Technical BRD Sections 27-29 and 52
- BRD Sections 35-37
- Planning EPIC-05 and EPIC-10
