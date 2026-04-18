# Deployment Guide

## Vercel Environment Variables

For successful deployment to Vercel, you need to configure the following environment variable:

### Required Environment Variable

**`NPM_TOKEN`** (GitHub Personal Access Token)

- **Value**: `&lt;your-github-personal-access-token&gt;`
- **Purpose**: Allows npm to install private packages from GitHub Packages (`@trucupei/contact-form` and `@trucupei/graphql-schema`)
- **Scope**: This token must have `read:packages` permission
- **Environment**: Add to all environments (Production, Preview, Development)

### How to Add in Vercel Dashboard

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add new variable:
   - **Key**: `NPM_TOKEN`
   - **Value**: `&lt;your-github-personal-access-token&gt;`
   - **Environments**: Select all (Production, Preview, Development)
4. Click **Save**

### Existing Environment Variables

Make sure these are still configured:

- `GRAPHQL_MOCK_MODE=false`
- `BACKEND_API_URL=https://portal.reai.co/api` (for production)
- `NEXT_PUBLIC_REAI_WEBSITE_URL` (your production URL)
- `HMAC_SECRET_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_ACCESS_TOKEN`
- `SUPABASE_PROJECT_REF`
- `SLACK_WEBHOOK_URL`

## Build Process

The `.npmrc` file in the project root uses the `NPM_TOKEN` environment variable to authenticate with GitHub Packages:

```
@trucupei:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

During Vercel build:

1. Vercel runs `npm install`
2. npm reads `.npmrc` and substitutes `${NPM_TOKEN}` with the environment variable
3. Private packages are downloaded from GitHub Packages
4. Build continues normally

## Troubleshooting

### Build fails with "npm ERR! 404 Not Found"

**Cause**: `NPM_TOKEN` environment variable is missing or invalid

**Solution**:

1. Check that `NPM_TOKEN` is set in Vercel environment variables
2. Verify the token has `read:packages` scope
3. Redeploy after adding/updating the variable

### Build fails with authentication errors

**Cause**: Token doesn't have proper permissions

**Solution**:

1. Generate a new GitHub token with `read:packages` scope
2. Update `NPM_TOKEN` in Vercel settings
3. Trigger a new deployment

## Package Dependencies

This project uses the following private packages from GitHub Packages:

- `@trucupei/contact-form@^1.1.2` - Contact form component
- `@trucupei/graphql-schema@^1.0.0` - Shared GraphQL schema

Both are required for successful builds.

## Local Development Setup

For local development, add the GitHub Packages token to your global npm configuration:

```bash
echo "//npm.pkg.github.com/:_authToken=&lt;your-github-personal-access-token&gt;" >> ~/.npmrc
```

This allows npm to authenticate with GitHub Packages automatically for `npm install` and `npm publish` commands.

**How it works:**

- Project `.npmrc` specifies the registry and has `${NPM_TOKEN}` placeholder
- **Local dev**: Global `~/.npmrc` provides the actual token (npm ignores `${NPM_TOKEN}`)
- **Vercel**: Substitutes `${NPM_TOKEN}` with the environment variable during build
- npm merges both configurations automatically

**Important Notes:**

- The project `.npmrc` has `${NPM_TOKEN}` which npm doesn't expand locally
- That's why the global `~/.npmrc` is needed for local dev
- Vercel's build system will expand `${NPM_TOKEN}` from environment variables
- This allows the same `.npmrc` file to work in both environments
