# Session 04 — Blog Listing, Details, Markdown, and Video

- **Roadmap phase:** Frontend foundation
- **Prerequisite:** Sessions 02–03
- **Learning status:** Planned; public blog pages and Firestore integration are not yet present in the current starter source.

## What you will learn

- Explain the difference between a list of blog previews and one full article.
- Understand pagination and category filters.
- Describe a URL slug and how it can identify a blog.
- Explain Markdown and why untrusted HTML must be handled carefully.
- Explain how a YouTube video ID can be used to form an embed.
- Understand that public pages should show published content only.

## Preview vs detail

A **blog preview** is a short invitation: title, summary, category, date, and a link. A **detail page** shows the full article. The listing design shows ten previews per page and uses pagination.

**Analogy:** A library catalogue gives you the title and shelf location; the detail page is the whole book.

## Slugs and pagination

A **slug** is a readable part of a URL, such as `/blog/java-basics`. It can help identify which article to display. The project must ensure slugs are unique or use a reliable ID.

**Pagination** divides a long list into smaller pages. If the page size is ten, page one shows up to ten posts and page two shows the next set. Changing category should reset or preserve the page in a predictable way.

## Markdown and content safety

Markdown is plain text with simple symbols for headings, lists, and code blocks:

```md
# Heading

Use `code` for a short example.
```

A Markdown renderer converts those symbols into display elements. Never assume content is safe just because it is Markdown: unsafe raw HTML or links can create risks. Use a safe renderer and follow the TDD's sanitization constraints.

## YouTube embeds

The post stores a YouTube **video ID**, not a video upload. The page constructs a trusted YouTube embed URL from the ID and displays it in an iframe. Validate the ID and restrict the provider; do not allow arbitrary user-provided iframe HTML.

## Guided learning activity

1. On paper, draw a listing card and label title, summary, category, date, thumbnail, and More link.
2. Draw a detail page with article title, metadata, Markdown body, optional video, and related posts.
3. Create three example post records and show which belong on page 1 if the limit is ten.
4. Decide what the page should display when a slug does not exist: a clear not-found state, not a blank screen.
5. When implementation exists, verify a visitor can open a published preview and cannot access a draft.

## Common beginner mistakes

- **Putting the full article in every preview:** it makes the list hard to scan.
- **Using a title as a database ID:** titles can change; use a stable identifier and a slug strategy.
- **Trusting raw Markdown HTML:** rendering user-controlled markup without sanitization can be unsafe.
- **Embedding arbitrary URLs:** construct embeds only from the allowed YouTube provider and validated ID.
- **Assuming hidden UI protects a draft:** Firestore Security Rules must enforce access.

## Recap

Listings summarize; detail pages provide the full article. Pagination controls list size. Markdown must be rendered safely. YouTube is embedded by a validated ID. Draft privacy is enforced by database rules.

**I can explain this if I can answer:** What is a slug? What does pagination do? Why is raw HTML risky? Why can a draft not rely only on a hidden link?

## Sources and verification

- UI source: `docs/initial-project-docs/front-end-UI-design-doc.md`.
- Technical source: `docs/initial-project-docs/tdd-docs.md`, content and security sections.
- Session source: `docs/initial-project-docs/master-execution-plan.md`, Session 4.
