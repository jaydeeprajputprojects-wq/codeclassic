# Code Classic – Front-End UI Design Specification

**Document Type:** Front-End Design Specification  
**Project:** Code Classic  
**Version:** 1.0  
**Status:** Phase 1 Visual Baseline / Source of Truth  
**Reference:** User-approved Code Classic UI design image  
**Scope:** Front-end layout, visual styling, components, positioning, and responsive behaviour

This specification, together with the BRD and TDD, is the source of truth for Phase 1 UI and product behavior. The master execution plan sequences implementation of BRD Phase 1 only.

---

## 1. Purpose

This document defines the visual design and front-end layout standards for the Code Classic website.

It is intended to help developers, UI designers, and other team members implement a consistent interface without making independent assumptions about colours, spacing, component placement, or responsive behaviour.

The approved design uses:

- A clean, reader-friendly interface.
- A warm off-white page background.
- Dark teal navigation ribbons.
- Pale teal section headers.
- White content cards.
- A three-column desktop homepage.
- A large technology banner carousel.
- Compact blog previews.
- Separate blog listing and blog detail pages.
- Responsive layouts for desktop, tablet, and mobile.

**Important:** This is a front-end design document. It defines how the website should look and behave visually. It does not define backend APIs, database design, authentication implementation, or business logic.

The supplied reference image is a visual layout reference only. Its sample question titles and “Recently Posted Questions” content are not Phase 1 functionality; render the Q&A Coming Soon placeholder defined below instead.

## 2. Design Principles

The following principles should guide all front-end implementation decisions.

| Principle | Design direction |
|---|---|
| Readability | Use clear typography, comfortable line spacing, and sufficient contrast |
| Simplicity | Avoid unnecessary colours, gradients, animations, and decorative elements |
| Consistency | Reuse the same colours, spacing, borders, and button styles |
| Content first | Give blog titles, descriptions, and article content priority |
| Visual hierarchy | Use different font weights, sizes, and section headers to distinguish content |
| Responsiveness | Maintain usability on desktop, tablet, and mobile |
| Maintainability | Build reusable components instead of repeating styles |

The website should look like a professional technical learning platform rather than a complex corporate dashboard.

---

## 3. Global Colour System

The approved reference uses a warm, light background with dark teal navigation and muted teal accents.

The following HEX values are the proposed implementation tokens. They are visual approximations based on the approved reference image and should be treated as the initial design palette.

### 3.1 Primary colours

| Colour token | HEX | Usage |
|---|---|---|
| Primary dark teal | `#07383B` | Main navigation ribbon |
| Secondary dark teal | `#0B4548` | Navigation variation and dark accents |
| Action teal | `#087D79` | Primary buttons, active navigation, links |
| Deep teal | `#075E5B` | Hover states and emphasized links |
| Pale teal | `#E4F1EF` | Section header backgrounds |
| Light teal | `#D5E9E6` | Active category and selected states |

### 3.2 Background and surface colours

| Colour token | HEX | Usage |
|---|---|---|
| Page background | `#F5F6F4` | Main website background |
| Card background | `#FFFFFF` | Blog cards, sidebars, content panels |
| Secondary surface | `#F0F3F2` | Reserved areas and secondary containers |
| Border | `#DCE4E2` | Card borders and separators |
| Divider | `#E7ECEA` | Lines between blog previews |

### 3.3 Text colours

| Colour token | HEX | Usage |
|---|---|---|
| Primary text | `#14292D` | Main headings and blog titles |
| Secondary text | `#536467` | Descriptions and supporting information |
| Muted text | `#758386` | Dates, metadata, and secondary labels |
| Text on dark | `#FFFFFF` | Navigation and dark button text |

### 3.4 Supporting accent colours

Use accent colours only when they have a meaningful purpose.

| Accent | HEX | Usage |
|---|---|---|
| Soft red | `#F8E9E8` | Important news item background |
| Soft blue | `#E8F0F8` | Informational news item background |
| Java orange | `#E99B37` | Java-related visual elements |
| Azure blue | `#1687C9` | Azure-related visual elements |
| Spring green | `#66A94D` | Spring-related visual elements |

Do not use all accent colours throughout the website. They should mainly appear in technology icons, illustrations, and selected news cards.

### 3.5 Colour usage rules

1. The page background must remain light and warm.
2. The navigation ribbon must use dark teal.
3. Section headings must use pale teal.
4. Main content cards must use white backgrounds.
5. Buttons and important links must use action teal.
6. Text must use dark ink rather than pure black.
7. Avoid large areas of bright red, blue, green, or other saturated colours.
8. Do not introduce a new colour without checking whether an existing design token can be reused.

---

## 4. Typography

Use **Inter** as the preferred font family.

Fallback fonts:

`Arial, Helvetica, sans-serif`

The typography should be simple, modern, and comfortable for reading technical content.

### 4.1 Typography scale

| Element | Desktop size | Mobile size | Weight |
|---|---:|---:|---|
| Website logo | 28–32px | 23–26px | 700 |
| Main page heading | 25–30px | 21–24px | 700 |
| Section heading | 19–21px | 17–19px | 600 |
| Blog title | 16–17px | 15–16px | 600 |
| Article heading | 30–34px | 24–28px | 700 |
| Body text | 15–16px | 15–16px | 400 |
| Blog description | 13–14px | 13–14px | 400 |
| Metadata | 12–13px | 12px | 400 |
| Button text | 13–14px | 13–14px | 600 |

### 4.2 Reading and article typography

For individual blog pages:

- Body font size: 16px.
- Line height: 1.7.
- Paragraph spacing: 16–20px.
- Heading spacing: 24–32px above major headings.
- Code blocks must have a separate background and readable monospace font.
- Avoid very long lines of text.
- Use a comfortable article width instead of stretching the text across the full screen.

Recommended article font:

`Inter, Arial, sans-serif`

Recommended code font:

`Consolas, "Courier New", monospace`

---

## 5. Global Layout and Dimensions

### 5.1 Website container

The desktop website should use a centered content container.

| Property | Recommended value |
|---|---:|
| Maximum website width | 1480px |
| Desktop outer margin | 24–36px |
| Main card radius | 10–12px |
| Standard border width | 1px |
| Standard card shadow | Very subtle |
| Main section gap | 20–24px |

The layout should not touch the browser edges on desktop.

### 5.2 Desktop homepage grid

The homepage uses three columns.

| Column | Approximate width | Purpose |
|---|---:|---|
| Left sidebar | 22% | Recently published posts and reserved advertisement |
| Centre content | 56% | Banner carousel and latest blogs |
| Right sidebar | 22% | Recently posted questions, news, and advertisement |

Use CSS Grid for this layout.

Suggested starting structure:

```css
.home-layout {
  display: grid;
  grid-template-columns: minmax(220px, 0.95fr)
                         minmax(500px, 2.5fr)
                         minmax(220px, 0.95fr);
  gap: 20px;
  align-items: start;
}
```

The centre column must receive the largest share of available space.

The left and right sidebars should remain visually balanced.

### 5.3 Card styling

All main cards should follow a shared style.

```css
.card {
  background: #FFFFFF;
  border: 1px solid #DCE4E2;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(20, 41, 45, 0.06);
  overflow: hidden;
}
```

Avoid heavy shadows, thick borders, or excessive rounded corners.

---

## 6. Header Design

The website header contains exactly two horizontal ribbons.

### 6.1 First ribbon – Brand and account area

**Position:** At the top of the website.

**Background:** White (`#FFFFFF`).

**Recommended height:** 64–68px on desktop.

The ribbon contains three main sections.

#### Left section – Brand

Display:

- Code symbol icon: `</>`
- Website name: `Code Classic`

Design requirements:

- Logo and text must appear horizontally aligned.
- Logo should use dark teal.
- Website name should use primary text colour.
- Logo text should be bold.
- Keep the logo on the left side.
- The logo should link to the homepage.

The initial design can use a code icon and text. A custom logo image can replace it later without changing the header layout.

#### Right section – Social media and login

Display the following social icons:

1. YouTube
2. LinkedIn
3. Instagram

Each icon must link to its respective social media page.

Use recognisable platform icons and maintain consistent icon sizing.

After the social icons, add a subtle vertical divider followed by the account control.

**Logged-out state:**

- Display an outlined Login button.
- Include a user icon.
- Use a white background.
- Use a dark teal border and text.
- Use a rounded pill-style button.
- The login screen must provide access to the password-reset request flow.

**Logged-in state:**

- Replace Login with a profile icon or username.
- Clicking it opens a dropdown.
- The dropdown can contain Profile and Logout options.
- Keep the same visual styling as the rest of the website.

### 6.2 Second ribbon – Main navigation

**Position:** Directly below the first ribbon.

**Recommended desktop height:** 50–52px.

**Background:** Primary dark teal (`#07383B`).

Navigation items, in this exact order:

1. Home
2. Blog
3. Q&A
4. About Us

#### Home

- Home icon.
- Text label.
- Active state displayed with a lighter teal background.
- Rounded corners around the active item.

#### Blog

- Blog/layers icon.
- Text label.
- Dropdown arrow.
- On hover or click, show a category dropdown.

Suggested categories:

- All Blogs
- Java
- Spring Boot
- Microservices
- Azure
- DevOps
- SQL
- System Design
- Others

The category list can be updated as the content library grows.

#### Q&A

- Chat or message icon.
- Text label.
- Must remain visible in the navigation.
- In Phase 1, it opens a clearly labeled Coming Soon placeholder page or panel.
- Do not display sample question links as if they were live, or show question search, comments, answer lists, or submission controls.
- The placeholder may briefly explain that community Q&A is planned for a future product release.

#### About Us

- User/about icon.
- Text label.
- Opens a simple informational page.
- The content can be added later.

### 6.3 Navigation behaviour

Desktop:

- Navigation items should be horizontally aligned.
- Maintain consistent spacing.
- Use white text and icons.
- Active navigation item uses a lighter teal background.
- Dropdown menus should appear below their parent item.
- Dropdowns should have a white background, subtle border, and shadow.

Mobile:

- Use a compact header.
- Display the logo on the left.
- Display a hamburger menu on the right.
- The hamburger opens a vertical navigation panel.
- The panel should contain Home, Blog categories, Q&A, and About Us.
- Social links and account controls can appear inside the opened menu.
- Do not attempt to squeeze all desktop navigation items into one narrow row.

---

## 7. Homepage Design

The homepage is the main landing page for visitors.

It must follow the three-column layout on desktop.

### 7.1 Left sidebar

The left sidebar contains two main components.

#### Component A – Recently Published

**Purpose:** Help visitors quickly discover recently published articles.

**Position:** Top of the left sidebar.

**Card structure:**

- Pale teal section header.
- Bookmark icon.
- Heading: Recently Published.
- List of recent blog links.

Each item should contain:

- Small technology or code icon.
- Blog title.
- Publication date.

Display five recent posts.

Long titles must be shortened using ellipsis rather than overflowing the card.

Example:

- Getting Started with Java 21 ...
- Build REST APIs with Spring Boot ...
- Deploy Spring Boot on Azure ...
- Java vs Kotlin – What to Choose? ...
- Introduction to Azure App Service ...

At the bottom, display:

**View All Posts →**

This link opens the blog listing page.

#### Component B – Advertisement placeholder

**Position:** Below Recently Published.

**Purpose:** Reserve space for future Google AdSense integration.

Design requirements:

- Use a light grey-green surface.
- Display the text `Ad Space (Reserved)`.
- Do not display fake advertisements.
- Maintain a rectangular layout.
- On desktop, the placeholder should occupy the available sidebar width.

The actual advertisement integration is outside this design document.

### 7.2 Centre content

The centre column is the most important part of the homepage.

It contains:

1. Banner carousel.
2. Latest Blogs section.

#### Component A – Technology banner carousel

**Position:** At the top of the centre column.

**Purpose:** Highlight important technical categories and learning topics.

**Recommended desktop aspect ratio:** Approximately 16:5.

The banner should be wide and horizontal.

Each slide contains:

- Technology-related background image.
- Technology icon or logo.
- Main title.
- Short supporting description.
- Call-to-action button.
- Previous and next arrows.
- Pagination dots.

Example slides:

| Slide | Heading | Description | Button |
|---|---|---|---|
| 1 | Java Essentials | Core Java, Best Practices and Real-world Examples | Explore Java |
| 2 | Spring Boot Development | Build REST APIs and production-ready applications | Explore Spring Boot |
| 3 | Azure for Developers | Learn deployment, cloud services, and DevOps | Explore Azure |

#### Banner visual rules

- Use dark technology-themed images.
- Maintain sufficient contrast between text and image.
- Use a subtle dark overlay if required for readability.
- Place the title and description on the left.
- Place the main visual/background image on the right where possible.
- Keep the call-to-action button below the description.
- Use rounded corners of approximately 12px.
- Avoid excessive text on the banner.

#### Carousel controls

Previous and next arrows:

- Circular background.
- Semi-transparent light surface.
- Dark icon.
- Positioned vertically in the centre of the banner edges.

Pagination dots:

- Display at the bottom centre.
- Active dot uses action teal.
- Inactive dots use a lighter shade.

#### Carousel behaviour

- Rotate slides automatically at a reasonable interval, such as 5–6 seconds.
- Pause automatic rotation while the user interacts with the carousel.
- Allow manual navigation.
- Clicking the button opens the relevant category page.
- On mobile, preserve the image and title without making the banner too tall.

The carousel should not dominate the page or push the blog content too far down.

#### Component B – Latest Blogs

**Position:** Immediately below the banner.

**Section header:**

- Pale teal background.
- Document/article icon.
- Heading: Latest Blogs.

**Homepage display limit:** Exactly five blog previews.

Each preview contains the following:

| Element | Description |
|---|---|
| Technology icon | Small icon representing the topic |
| Blog title | Main clickable title |
| Description | Short summary of the article |
| Publication date | Date with calendar icon |
| More button | Opens the full blog detail page |

#### Blog preview layout

Desktop:

- Technology icon on the left.
- Blog title and description in the middle.
- Date towards the right.
- More button at the far right.
- Horizontal divider between previews.

Example:

**Getting Started with Java 21 – Key Features & Examples**

A quick overview of what's new in Java 21 with simple examples.

Publication date: Jan 25, 2025

Button: More →

#### More button behaviour

The More button must navigate to the individual blog detail page.

Do not expand the full blog content inside the homepage.

Do not display comments, Q&A submissions, or answer sections inside the homepage previews.

#### Homepage pagination

The homepage shows exactly five previews.

A View All or Blog navigation option should open the main blog listing page.

The homepage itself should not become an endless blog feed.

### 7.3 Right sidebar

The right sidebar contains three components.

#### Component A – Q&A Coming Soon

**Position:** Top of the right sidebar.

**Phase 1 behavior:** This panel is a visual placeholder for the future Q&A capability, not a functional question feed.

- Use the shared pale teal section header, question/help icon, and a heading such as `Q&A Coming Soon`.
- Display a short explanatory message that questions and answers are not available yet.
- Do not show invented or static question titles that appear to be live questions.
- Do not provide question detail links, answer links, search, comments, or submission actions.

The navigation Q&A item and the right-sidebar placeholder should lead to the same non-functional Coming Soon page/panel. Actual question and answer functionality belongs to the later community product phase.

#### Component B – News & Updates

**Position:** Below the Q&A Coming Soon panel.

**Section header:**

- Pale teal background.
- Announcement/megaphone icon.
- Heading: News & Updates.

Each news item should be a compact clickable card.

Example items:

- Java 21 is now GA – Key highlights and what's new.
- Azure adds new features for Spring Boot deployments.

Use restrained background variations:

- Soft red for selected important updates.
- Soft blue for informational updates.

Each item should:

- Have a small news/link icon.
- Display a short title.
- Be clickable.
- Redirect to the configured destination.

The news content and destination links can be maintained as curated front-end content initially.

#### Component C – Advertisement placeholder

**Position:** Below News & Updates.

Use the same design as the left advertisement placeholder.

- Light grey-green background.
- Text: `Ad Space (Reserved)`.
- No fake advertisements.
- Maintain consistent styling and spacing.

---

## 8. Blog Listing Page

The Blog page displays all available blog previews and provides category-based navigation.

It uses the same global two-ribbon header.

### 8.1 Desktop layout

Use a two-column layout.

| Column | Approximate width | Purpose |
|---|---:|---|
| Left sidebar | 22% | Blog categories |
| Main content | 78% | Blog listing |

The main content must receive more space.

### 8.2 Left component – Categories

**Section heading:** Categories

Display a vertical list:

- All Blogs
- Java
- Spring Boot
- Microservices
- Azure
- DevOps
- SQL
- System Design
- Others

Each category should have a small icon.

The active category should have:

- Pale teal background.
- Dark teal text.
- Rounded corners.

Clicking a category filters the visible blog list.

The All Blogs category displays all published posts.

### 8.3 Main component – All Blogs

At the top, display the selected category or page heading.

Examples:

- All Blogs (Page 1)
- Java Blogs
- Spring Boot Blogs

Display exactly ten blog previews per page.

Each preview should contain:

- Technology icon or thumbnail.
- Blog title.
- Short description.
- Publication date.
- More button.

Use the same visual structure as the Latest Blogs section on the homepage.

The blog preview must not show the full article.

### 8.4 Pagination

Pagination should appear below the blog list.

Example:

`« Prev   1   2   3   ...   Next »`

Design requirements:

- Active page uses action teal.
- Inactive pages use a white background.
- Buttons have subtle borders.
- Pagination should be centred.
- On mobile, reduce the number of visible page numbers if necessary.

Pagination must preserve the selected category.

### 8.5 Banner behaviour on the Blog page

The homepage banner should not occupy a large area on every listing page.

For the initial design:

- Show the full carousel on the homepage.
- On the Blog listing page, prioritise the category and blog list.
- If a banner is needed later, use a compact category banner rather than the full homepage carousel.

---

## 9. Full Blog Detail Page

The individual blog page is designed for comfortable reading.

It uses the same two-ribbon header.

### 9.1 Main layout

Use a two-column article layout.

| Column | Approximate width | Purpose |
|---|---:|---|
| Main article | 75% | Blog content |
| Right sidebar | 25% | Related posts |

The article should have sufficient width for code snippets, diagrams, and technical explanations.

### 9.2 Breadcrumb navigation

At the top of the article, show a breadcrumb.

Example:

`Home > Blog > Java`

Requirements:

- Small font size.
- Muted text colour.
- Each previous level should be clickable.
- Current category should be clearly visible.

### 9.3 Article header

Display:

1. Blog title.
2. Publication date.
3. Category label.
4. Estimated reading time.

Example:

**Getting Started with Java 21 – Key Features & Examples**

Calendar icon | Jan 25, 2025

Category: Java

Reading time: 8 min read

The title must be the most prominent element.

### 9.4 Article thumbnail or hero image

Display the main article image below the article metadata.

Requirements:

- Full available article width.
- Rounded corners.
- Consistent image treatment.
- Preserve image aspect ratio.
- Avoid stretching images.

The reference design uses a wide Java-themed visual.

### 9.5 Article content

The article body should support:

- Headings.
- Paragraphs.
- Ordered and unordered lists.
- Images.
- Links.
- Code snippets.
- Tables.
- Embedded YouTube videos.

Recommended reading styles:

- 16px body text.
- 1.7 line height.
- Clear heading hierarchy.
- Consistent paragraph spacing.
- Code blocks with a separate background and horizontal scrolling on small screens.

For technical code blocks, use a monospace font and ensure long lines do not break the page layout.

### 9.6 Related Posts sidebar

**Position:** Right side of the article.

**Section heading:** Related Posts

Each related item contains:

- Small code or topic icon.
- Related blog title.
- Link to the corresponding article.

Example:

- Java 21 – New Features Explained
- Java vs Kotlin – A Practical Comparison
- Top 10 Java Best Practices

The related posts section should remain visually secondary to the main article.

### 9.7 Mobile article layout

On mobile:

- Article content uses the full available width.
- Related Posts moves below the article.
- Breadcrumbs can wrap onto another line.
- Article images become responsive.
- Code blocks scroll horizontally within their own container.

---

## 10. Common Reusable Components

The following components should be reused across pages.

| Component | Purpose |
|---|---|
| `SiteHeader` | Main brand ribbon |
| `SocialLinks` | YouTube, LinkedIn, Instagram |
| `AccountMenu` | Login or profile dropdown |
| `MainNavigation` | Home, Blog, Q&A, About Us |
| `BlogCategoryDropdown` | Blog category navigation |
| `PageContainer` | Consistent page width and margins |
| `SectionCard` | Shared card container |
| `SectionHeader` | Pale teal heading strip |
| `TechnologyBanner` | Homepage carousel |
| `RecentPosts` | Recently published sidebar |
| `BlogPreviewList` | List of blog previews |
| `BlogPreviewItem` | Individual preview |
| `QaComingSoon` | Non-functional Phase 1 placeholder for future Q&A |
| `NewsUpdates` | News and update cards |
| `AdPlaceholder` | Reserved advertisement area |
| `CategorySidebar` | Blog category navigation |
| `Pagination` | Blog listing page navigation |
| `Breadcrumbs` | Article navigation path |
| `ArticleHeader` | Title and metadata |
| `ArticleContent` | Main article body |
| `RelatedPosts` | Related article links |
| `SiteFooter` | Footer area |

Component names are suggested names, not mandatory file names. The important requirement is that shared visual elements remain consistent.

---

## 11. Responsive Design Specification

The desktop reference is the primary visual baseline. The layout must adapt to smaller screens while retaining the same visual identity.

### 11.1 Breakpoints

Use the following initial breakpoints.

| Device | Width | Layout |
|---|---:|---|
| Large desktop | 1200px and above | Three-column homepage |
| Tablet landscape | 992px–1199px | Reduced-width sidebars |
| Tablet portrait | 768px–991px | Two-column or stacked layout |
| Mobile | Below 768px | Single-column layout |
| Small mobile | Below 480px | Compact single-column layout |

These breakpoints are starting implementation values. Test the actual layout at intermediate screen widths as well.

### 11.2 Desktop behaviour

At 1200px and above:

- Show both header ribbons.
- Show all four navigation items horizontally.
- Show the three-column homepage.
- Keep the carousel wide.
- Show five homepage previews.
- Show both sidebars.
- Keep the blog detail related-post sidebar on the right.

### 11.3 Tablet behaviour

At 768px–1199px:

- Keep the brand ribbon compact.
- Reduce horizontal navigation spacing.
- Use a two-column homepage layout where practical.
- The centre content should retain priority.
- Move one or both sidebars below the main content when the available width is insufficient.
- Reduce the banner height.
- Preserve readable blog titles and descriptions.

Suggested tablet homepage arrangement:

1. Main centre content.
2. Recently Published section.
3. Q&A Coming Soon.
4. News & Updates.
5. Advertisement placeholders.

Do not compress the three desktop columns until the content becomes difficult to read.

### 11.4 Mobile behaviour

Below 768px, use a single-column layout.

**Header:**

- Logo on the left.
- Hamburger menu on the right.
- Social links and account controls inside the opened navigation panel.

**Homepage order:**

1. Technology banner carousel.
2. Latest Blogs.
3. Recently Published.
4. Q&A Coming Soon.
5. News & Updates.
6. Advertisement placeholders.

The main learning content must appear before secondary sidebar content.

**Blog listing page:**

1. Page heading.
2. Category selector or collapsible category panel.
3. Blog previews.
4. Pagination.

The category panel should not occupy a permanent desktop-style sidebar on mobile.

**Blog detail page:**

1. Breadcrumb.
2. Article title.
3. Metadata.
4. Hero image.
5. Article content.
6. Related Posts.

The right sidebar must move below the article.

### 11.5 Mobile component dimensions

| Component | Mobile guidance |
|---|---|
| Header height | Approximately 56–64px |
| Page side padding | 14–16px |
| Card radius | 10px |
| Card internal padding | 12–16px |
| Section heading | 16–18px |
| Blog title | 15–16px |
| Body text | 15–16px |
| Button height | At least 40px |
| Banner | Approximately 16:9 |
| Blog preview | Vertical or compact stacked layout |

### 11.6 Mobile blog preview

The desktop horizontal row should become a stacked card or compact vertical layout.

Suggested order:

- Technology icon or thumbnail.
- Blog title.
- Description.
- Publication date.
- More button.

The button must remain easy to tap.

Avoid tiny buttons or closely packed links.

---

## 12. Interaction and Visual States

Every interactive component should have clearly defined visual states.

### 12.1 Buttons

Primary button:

- Background: `#087D79`
- Text: white
- Border radius: 7–9px
- Medium font weight

Secondary button:

- Background: white
- Border: `#087D79`
- Text: dark teal

Hover:

- Use a slightly darker teal.
- Keep the text readable.
- Use a short transition.

Disabled:

- Reduce contrast.
- Prevent pointer interaction.
- Do not use the disabled style for active controls.

### 12.2 Links

- Default: dark teal or primary text.
- Hover: deep teal.
- Underline may be used for inline article links.
- Navigation links should not be underlined by default.

### 12.3 Cards

- Default: white background and subtle border.
- Hover: slightly stronger shadow or border.
- Avoid large movement or zoom effects.
- Entire card should only be clickable if that behaviour is intentional.

### 12.4 Dropdowns

- White background.
- Subtle border.
- Rounded corners.
- Soft shadow.
- Clear spacing between items.
- Active item uses pale teal background.

### 12.5 Carousel

- Previous and next controls must be keyboard accessible.
- Active pagination indicator must be visible.
- Do not rely on colour alone to communicate the active slide.

---

## 13. Iconography and Images

### 13.1 Icons

Use a consistent icon family, preferably Lucide.

Recommended icons:

| Purpose | Suggested icon |
|---|---|
| Website logo | Code |
| Home | House |
| Blog | Layers |
| Q&A | Message Circle |
| About Us | User |
| Login | User Round |
| Profile | Circle User |
| Recently Published | Bookmark |
| Questions | Circle Help |
| News | Megaphone |
| Calendar | Calendar |
| More | Arrow Right |
| Categories | Layers |
| Menu | Menu |

Use consistent stroke weight and sizing.

Avoid mixing multiple icon styles.

### 13.2 Technology images

Technology-related images can be used for:

- Banner slides.
- Blog thumbnails.
- Article hero images.
- Technology category illustrations.

Image guidelines:

- Use relevant, high-quality images.
- Maintain consistent cropping.
- Avoid excessive text inside thumbnails.
- Use technology logos only where appropriate.
- Do not stretch images to fit a container.

### 13.3 Banner image treatment

The banner should use wide landscape images with enough dark space for readable text.

If text is placed over an image, ensure sufficient contrast using a subtle overlay.

---

## 14. Spacing and Alignment Standards

Use a consistent spacing scale.

| Token | Value | Usage |
|---|---:|---|
| `space-1` | 4px | Small icon spacing |
| `space-2` | 8px | Compact element spacing |
| `space-3` | 12px | Internal card spacing |
| `space-4` | 16px | Standard spacing |
| `space-5` | 20px | Card and section gaps |
| `space-6` | 24px | Major section spacing |
| `space-8` | 32px | Large separation |
| `space-10` | 40px | Page-level spacing |

Rules:

- Keep section headers aligned across cards.
- Keep blog preview separators consistent.
- Align icons vertically with their text.
- Use consistent card padding.
- Avoid unnecessary empty space inside compact components.
- Do not allow text to touch card edges.

---

## 15. Front-End Design Tokens

The following CSS variables should act as the single source of truth for the visual theme.

```css
:root {
  /* Brand colours */
  --color-primary: #07383B;
  --color-primary-light: #0B4548;
  --color-action: #087D79;
  --color-action-hover: #075E5B;

  /* Backgrounds */
  --color-page-bg: #F5F6F4;
  --color-surface: #FFFFFF;
  --color-surface-secondary: #F0F3F2;
  --color-section-header: #E4F1EF;
  --color-active: #D5E9E6;

  /* Text */
  --color-text-primary: #14292D;
  --color-text-secondary: #536467;
  --color-text-muted: #758386;
  --color-text-on-dark: #FFFFFF;

  /* Borders */
  --color-border: #DCE4E2;
  --color-divider: #E7ECEA;

  /* Supporting accents */
  --color-news-red: #F8E9E8;
  --color-news-blue: #E8F0F8;

  /* Typography */
  --font-family-base: Inter, Arial, Helvetica, sans-serif;
  --font-family-code: Consolas, "Courier New", monospace;

  /* Layout */
  --container-max-width: 1480px;
  --page-padding: 24px;
  --section-gap: 20px;

  /* Components */
  --radius-card: 12px;
  --radius-button: 8px;
  --radius-small: 6px;

  /* Shadows */
  --shadow-card: 0 2px 8px rgba(20, 41, 45, 0.06);
}
```

Developers should use these variables instead of writing separate HEX values throughout the application.

---

## 16. Suggested Front-End Page Structure

The initial front-end can be organised around these pages:

| Page | Suggested route | Description |
|---|---|---|
| Home | `/` | Banner, latest blogs, and sidebars |
| All Blogs | `/blog` | All published blog previews |
| Category Blogs | `/blog/:category` | Filtered blog listing |
| Blog Detail | `/blog/:slug` | Full individual article |
| Q&A | `/qa` | Phase 1 Coming Soon placeholder only; no questions or answers |
| About Us | `/about` | Project and founder information |
| Login | `/login` | Authentication screen with password-reset entry point |
| Register | `/register` | Registration screen with verification-pending and resend states |
| Verify Email | `/verify-email` | Verification instructions, resend action, and verified-state continuation |
| Reset Password | `/reset-password` | Request password-reset email and show generic confirmation/error states |
| Profile | `/profile` | User profile screen |

These routes describe the intended front-end navigation and do not prescribe backend implementation.

### Phase 1 account states

- After email/password registration, show a clear verification-pending screen and a resend-verification action. Do not expose authenticated profile or admin UI until Firebase confirms the email is verified.
- After the verification link is used, show a way to refresh/recheck verification state and continue to the intended page.
- Google sign-in may continue to authenticated pages only when Firebase confirms that the provider email is verified.
- The login screen must link to the reset-password request flow. Confirmation text must not reveal whether an email address is registered.

---

## 17. Design and Accessibility Requirements

The interface must remain usable for people accessing it through different devices and input methods.

Minimum requirements:

1. Maintain readable contrast between text and backgrounds.
2. Use meaningful labels for buttons and links.
3. Provide alternative text for meaningful images.
4. Ensure navigation can be used with a keyboard.
5. Provide visible keyboard focus indicators.
6. Do not communicate status using colour alone.
7. Maintain sufficiently large touch targets on mobile.
8. Avoid horizontal page scrolling.
9. Ensure dropdowns can be opened using keyboard interaction, not only mouse hover.
10. Respect reduced-motion preferences for carousel and other animations.

The visual palette should be checked for WCAG contrast compliance during implementation. The proposed HEX values are not a substitute for contrast testing.

---

## 18. Implementation Validation Checklist

Before considering the UI implementation complete, verify the following.

### Global header

- [ ] Two horizontal ribbons are implemented.
- [ ] Code Classic logo is aligned on the left.
- [ ] YouTube, LinkedIn, and Instagram links are visible.
- [ ] Login button is visible when logged out.
- [ ] Profile dropdown is available when logged in.
- [ ] Navigation contains Home, Blog, Q&A, and About Us.
- [ ] Blog dropdown contains the configured categories.

### Homepage

- [ ] Three-column desktop layout is implemented.
- [ ] Left sidebar displays five recent posts.
- [ ] Left advertisement placeholder is visible.
- [ ] Centre banner carousel is implemented.
- [ ] Carousel has previous and next controls.
- [ ] Carousel has pagination indicators.
- [ ] Latest Blogs displays exactly five previews.
- [ ] Every preview has a More button.
- [ ] More opens the individual blog page.
- [ ] Comments and Q&A are not displayed in previews.
- [ ] Right sidebar displays the non-functional Q&A Coming Soon placeholder, without live-looking question links.
- [ ] Q&A navigation and sidebar placeholder have no functional question or answer controls.
- [ ] Right sidebar displays News & Updates.
- [ ] Right advertisement placeholder is visible.

### Blog listing page

- [ ] Category sidebar is displayed on desktop.
- [ ] Active category has a pale teal background.
- [ ] Main section displays ten previews per page.
- [ ] Each preview contains title, description, date, and More button.
- [ ] Pagination is available.
- [ ] Selecting a category preserves the selected category during pagination.

### Blog detail page

- [ ] Breadcrumb is visible.
- [ ] Article title is prominent.
- [ ] Publication date, category, and reading time are displayed.
- [ ] Hero image is responsive.
- [ ] Article content has comfortable reading width.
- [ ] Code blocks are readable and scrollable when required.
- [ ] Related Posts sidebar is visible on desktop.
- [ ] Related Posts moves below the article on mobile.

### Responsive design

- [ ] Desktop layout works at 1200px and above.
- [ ] Tablet layout works between 768px and 1199px.
- [ ] Mobile layout works below 768px.
- [ ] Header navigation changes to a mobile menu.
- [ ] Homepage content stacks in the specified order.
- [ ] Blog categories become a mobile-friendly selector or collapsible panel.
- [ ] Blog previews remain readable.
- [ ] No horizontal page overflow occurs.
- [ ] Buttons and links are easy to tap.

### Visual consistency

- [ ] All pages use the same colour tokens.
- [ ] All cards use consistent borders and radii.
- [ ] Section headers use pale teal.
- [ ] Buttons use consistent styling.
- [ ] Typography follows the defined scale.
- [ ] No unnecessary colours or decorative effects have been introduced.

---

## 19. Final Design Decision

The approved Code Classic visual design is based on the following fixed decisions:

1. **Header:** Two horizontal ribbons, with branding and account controls in the first ribbon and primary navigation in the second.
2. **Colour theme:** Warm off-white, white surfaces, dark teal navigation, pale teal section headers, and restrained accent colours.
3. **Homepage:** Three-column desktop layout with left and right sidebars and a wider centre content area.
4. **Banner:** A wide technology-focused carousel at the top of the homepage centre column.
5. **Homepage blog previews:** Exactly five.
6. **Blog listing:** Exactly ten previews per page with category navigation and pagination.
7. **Blog detail:** Main article on the left and related posts on the right.
8. **Q&A:** Navigation and any Q&A panel lead only to a Coming Soon placeholder in Phase 1. No sample/live-looking questions or functional question, answer, comment, search, or submission controls are displayed.
9. **Advertisements:** Reserved placeholders only until actual integration.
10. **Responsive design:** Single-column mobile layout, with content priority preserved.

**Design baseline rule:** Future front-end development should follow this specification and the approved reference image. Any visual change to the colour palette, major positioning, header structure, or homepage layout should be treated as a design change rather than an individual implementation preference.

The goal is to make Code Classic visually consistent, easy to read, easy to navigate, and maintainable as the platform grows.