# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## ⚠️ Pre-Implementation Protocol

**🛑 STOP: Read this section BEFORE implementing any code changes!**

### Workflow Enforcement

Before writing ANY code, you MUST complete these steps in order:

#### Step 1: Verify Ticket Exists ✅

**Trigger words that require ticket verification:**

- "implement", "fix this", "start working on", "create this feature", "add this"
- "write the code", "build this", "develop this", "make this change"
- Any request to modify/create code files

**Actions:**

1. Check if user mentioned a Redmine ticket number (e.g., "#75", "Ticket #75")
2. If NO ticket exists:
   - Ask: _"Should I create a Redmine ticket for this work first?"_
   - Wait for user response
3. If user wants ticket created:
   - Create ticket with clear description, acceptance criteria
   - **ALWAYS assign to Wilmen Gil (user_id: 5)**
   - Get ticket number for branch naming
4. Document ticket number for next steps

**Redmine Ticket Creation:**

For **Frontend** project (under FreeHome.world):

- **Project ID:** `1` (Frontend)
- **Tracker ID:** `2` (Feature) or `1` (Bug)
- **Status ID:** `1` (New)
- **Priority ID:** `2` (Normal) by default
- **Assigned To:** `5` (Wilmen Gil) - ALWAYS assign tickets to Wilmen Gil

Example API call:

```json
{
  "issue": {
    "project_id": 1,
    "tracker_id": 2,
    "status_id": 1,
    "priority_id": 2,
    "assigned_to_id": 5,
    "subject": "Your ticket subject",
    "description": "Your detailed description with acceptance criteria"
  }
}
```

#### Step 2: Verify Correct Branch ✅

**CRITICAL: This step must complete BEFORE any code changes!**

**Actions:**

1. Run: `git branch --show-current`
2. Check if current branch matches pattern:
   - `feature/#<ticket-number>-<description>` (for new features)
   - `bugfix/#<ticket-number>-<description>` (for bug fixes)
3. If on `main`, `development`, or unrelated branch, **STOP IMMEDIATELY**
4. Output this message:

   ```
   ⚠️ Workflow Violation Detected!

   Current branch: [branch-name]
   Expected pattern: [feature|bugfix]/#[ticket-number]-[description]

   We need to create a proper branch before starting implementation.

   Suggested command:
   git checkout development && git pull && git checkout -b [feature|bugfix]/#[ticket-number]-[short-description]

   Example for Ticket #75:
   git checkout development && git pull && git checkout -b bugfix/#75-property-image-placeholder

   Should I create this branch now?
   ```

5. Wait for user confirmation
6. After branch created, verify with: `git branch --show-current`

#### Step 3: Update Ticket Status ✅

**Actions:**

1. Ask: _"Should I update Ticket #[number] status to 'In Progress' (status_id: 2)?"_
2. If yes, use Redmine API:
   ```json
   PATCH /issues/[ticket-number].json
   {
     "issue": {
       "status_id": 2
     }
   }
   ```
3. Confirm status updated successfully

#### Step 4: Begin Implementation ✅

**Only after all 3 steps above are complete:**

- ✅ Ticket exists and is assigned to Wilmen Gil
- ✅ Correct feature/bugfix branch is checked out
- ✅ Ticket status is "In Progress"

**Now you can safely:**

- Write code
- Create/modify files
- Track progress in Redmine

**After implementation is complete, the full workflow is:**

1. ✅ Get user approval to commit
2. ✅ Commit changes to feature/bugfix branch
3. ✅ Push branch to remote
4. ✅ Create PR to merge into `development` branch
5. ✅ Update Redmine ticket with PR link

**🛑 IMPORTANT - Commit Approval Required:**

- **NEVER commit changes without explicit user approval**
- After completing implementation, inform the user:
  - Summarize what was changed
  - Ask: _"The changes are ready. Would you like me to commit them, or would you like to test first?"_
- Wait for user to:
  - Test the changes locally
  - Review the code
  - Explicitly approve the commit
- Only after receiving approval, proceed with `git add` and `git commit`

#### Step 5: Create Pull Request to Development ✅

**After commit is complete, ALWAYS create a PR to merge into development:**

1. Push the feature/bugfix branch to remote:

   ```bash
   git push -u origin [branch-name]
   ```

2. Create a Pull Request using GitHub CLI:

   ```bash
   gh pr create --base development --title "[type](#ticket): Brief description" --body "$(cat <<'EOF'
   ## Summary
   - Brief description of changes

   ## Ticket
   Closes #[ticket-number] (link to Redmine ticket: https://pm.reai-int.net/issues/[ticket-number])

   ## Test Plan
   - [ ] Tested locally
   - [ ] Build passes

   🤖 Generated with [Claude Code](https://claude.com/claude-code)
   EOF
   )"
   ```

3. **NEVER merge directly to development** - always use a PR
4. After PR is created, provide the PR URL to the user
5. Update Redmine ticket with PR link in notes

### Workflow Violation Handling

If you catch yourself about to skip any step:

1. **STOP IMMEDIATELY** - Do not write code
2. Output:

   ```
   ⚠️ Workflow violation detected!

   I was about to [action] without [missing step].

   Let me correct this before proceeding:
   [List what needs to be done]
   ```

3. Complete the missing step(s)
4. Only proceed after user confirmation

### Emergency Override

**ONLY** bypass this workflow if user explicitly says:

- "Skip the workflow and just implement it"
- "I've already created the branch and updated the ticket"
- "This is a quick experiment, no ticket needed"

**Even then:**

- Confirm current branch with `git branch --show-current`
- Warn about risks of working outside workflow
- Proceed only after explicit user confirmation

---

## Development Commands

### Core Development Workflow

```bash
# Install dependencies
npm install

# Development server (uses Turbopack)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint

# Code formatting
npm run format              # Auto-format all files
npm run format:check        # Check formatting without modifying
```

### Pre-commit Hooks

- **Husky** is configured with `lint-staged` to automatically run ESLint and Prettier on staged files
- Pre-commit hook: Runs linting and formatting on changed files
- Pre-push hook: Additional validation before pushing

## Architecture Overview

### Technology Stack

- **Framework**: Next.js 15.3.3 with App Router (React 19)
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS with custom REAi theme and Radix UI primitives
- **Data Fetching**: Dual-layer approach with Apollo Client (GraphQL) + React Query
- **3D Graphics**: React Three Fiber + three-globe for interactive globe visualization

### Data Architecture

The application uses a **flexible GraphQL proxy system** that can switch between mock data and a real backend:

1. **Client Layer** → `src/lib/apollo-client.ts` (authenticated) & `apollo-public-client.ts` (public)
2. **Proxy Endpoint** → `src/app/api/graphql/route.ts` - switches based on `GRAPHQL_MOCK_MODE` env variable
3. **Mock Service** → `src/services/mock-graphql-service.ts` - serves JSON files from `mock-data/graphql/`
4. **Real Backend** → `src/services/graphql-service.ts` - proxies to `BACKEND_API_URL`

**Mock Data System**:

- GraphQL operations map to JSON files via `mock-data/graphql/operation-mapping.json`
- Supports operation variants (e.g., different pagination parameters → different files)
- Operations: `GetProperties`, `GetMunicipalities`, `GetPropertyStatistics`, `GetCountries`

### Component Structure

```
src/components/
├── homepage/          # Homepage-specific components (property/municipality cards, filters)
├── layout/            # Navigation components (mobile/desktop nav)
├── common/            # Shared components (Hero, GlobeSection, Map)
└── ui/                # Base UI primitives (Radix UI wrappers, theme components)
```

**Key Patterns**:

- Homepage components consume data via `useHomepageData()` hook
- GlobeSection is **client-side only** (uses `dynamic` import with `ssr: false`)
- All services follow SOLID principles with dependency injection patterns

### Service Layer Pattern

Services are organized by domain responsibility:

- **`homepage-service.ts`**: Aggregates homepage data (properties, municipalities, statistics)
- **`graphql-service.ts`**: Handles proxy requests to real backend with authentication
- **`mock-graphql-service.ts`**: Returns mock data based on operation mapping
- **`countries-service.ts`**: Manages country data

All services use **public Apollo client** for homepage (no auth required).

### State Management

- **Apollo Client** cache for GraphQL queries with custom type policies
- **React Query** for additional caching layer (1-minute stale time, no refetch on window focus)
- **Providers stack** in `src/app/providers.tsx`: ApolloProvider → QueryClientProvider → ThemeProvider

### Type System

- GraphQL types auto-generated in `src/graphql/generated/` (ignored by ESLint)
- Domain types in `src/types/`:
  - `core.ts` - Core domain entities
  - `property.ts` - Property-related types
  - `globe.ts` / `globe-reusable.ts` - 3D globe visualization types
- Path alias: `@/*` maps to `src/*`

### Environment Configuration

Required environment variables (`.env.local`):

```bash
GRAPHQL_MOCK_MODE=true                    # true = use mock data, false = use real API
BACKEND_API_URL=https://portal.reai.co/api  # Real GraphQL backend URL
NEXT_PUBLIC_REAI_WEBSITE_URL=http://localhost:3000
HMAC_SECRET_KEY=<secret>                   # For secure redirects
NEXT_PUBLIC_USE_HARDCODED_STATS=true      # true = use hardcoded stats (>1M, 176, 40+), false = use API data
```

### Styling System

- **Tailwind CSS** with custom configuration in `tailwind.config.js`
- Custom color palette: `reai` theme colors (50-950 shades)
- CSS variables in `globals.css` define theme tokens (primary, secondary, etc.)
- Custom animations: `fade-in`, `slide-in`, `currency-slide`
- Utility classes: `text-reai-heading`, `text-reai-body` for consistent typography
- Radix UI primitives provide accessible, unstyled components

### Authentication & GraphQL URL Construction

- `src/lib/graphql-url.ts` handles URL construction for client/server contexts
- Server-side: Uses `VERCEL_URL` or `NEXTAUTH_URL` or falls back to localhost
- Client-side: Uses `window.location.origin`
- Authentication token stored in localStorage (when not using public client)

### 3D Globe Visualization

- Located in `src/components/common/GlobeSection.tsx`
- Uses `three-globe` library with React Three Fiber
- Features:
  - Geographic polygon data from `public/custom.cleaned.geo.json`
  - Arc lines from `public/lines.json` showing property connections
  - Animated 3D house icons at property locations
  - Custom shaders and materials for visual effects
- **Important**: Must be dynamically imported with `ssr: false` to avoid server-side rendering issues

## Development Best Practices

### When Adding New GraphQL Operations

1. Add operation to backend schema (if using real backend)
2. For mock mode: Create JSON response file in `mock-data/graphql/`
3. Update `operation-mapping.json` with operation name and file mapping
4. Use variants array if the operation needs different responses for different parameters
5. Regenerate TypeScript types (if codegen is set up)

### Working with Mock vs Real Data

- Toggle `GRAPHQL_MOCK_MODE` in `.env.local` to switch between mock and real data
- Mock data is useful for:
  - Frontend development without backend dependency
  - Predictable testing scenarios
  - Offline development
- Real backend requires valid `BACKEND_API_URL` and proper CORS configuration

### Component Development

- Use `@/` path alias for imports
- Follow existing patterns: service layer → hooks → components
- Keep components focused (Single Responsibility Principle)
- Prefer composition over prop drilling
- Use Radix UI primitives for accessible components

### Image Optimization

- Images are **unoptimized** (`unoptimized: true` in `next.config.mjs`) for Lambda compatibility
- Remote patterns configured for:
  - `freehome-media-dev.s3.us-east-1.amazonaws.com`
  - Development: localhost (http/https)

### Code Quality

- **ESLint**: Extends `next/core-web-vitals` and `next/typescript`
- **Prettier**: 100-char print width, single quotes, semicolons, 2-space tabs
- Generated files (`src/graphql/generated/**`) are ignored by linters
- Run `npm run format` before committing to ensure consistency

## Deployment Notes

- Configured for **AWS Lambda** deployment (see `next.config.mjs`)
- `trailingSlash: false` required for Lambda Web Adapter
- Webpack externalizes `@aws-sdk/client-s3` for serverless environments
- Production optimization: CSS optimization disabled for Lambda compatibility
