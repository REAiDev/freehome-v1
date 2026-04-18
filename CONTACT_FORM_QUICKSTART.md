# Contact Form Module - Quick Start Guide

This is a **TL;DR** version of the contact form implementation. For full details, see:

- [CONTACT_FORM_ARCHITECTURE.md](./CONTACT_FORM_ARCHITECTURE.md) - Complete architecture
- [CONTACT_FORM_IMPLEMENTATION_PLAN.md](./CONTACT_FORM_IMPLEMENTATION_PLAN.md) - Detailed plan

---

## 🎯 What We're Building

A **shared contact form npm package** that:

- Works in both `frontend-home` and `reai_website`
- Stores submissions in Supabase via GraphQL API
- Sends Slack notifications
- Written once, maintained in one place

---

## 🚀 Quick Implementation Steps

### Step 1: GraphQL API (30 minutes)

```bash
cd /Users/trucupei/Projects/freehome/graphql-api
```

1. **Add to `prisma/schema.prisma`**:

```prisma
model contact_messages {
  id         String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  name       String
  email      String
  phone      String?
  message    String
  created_at DateTime @default(now()) @db.Timestamptz(6)
  updated_at DateTime @default(now()) @db.Timestamptz(6)

  @@index([created_at(sort: Desc)])
  @@index([email])
}
```

2. **Run migration**:

```bash
npx prisma migrate dev --name add_contact_messages
npm run prisma:generate
```

3. **Create module** at `src/modules/contact/`:
   - Copy files from implementation plan
   - 5 files: resolver, service, notification service, 2 DTOs

4. **Add to `.env`**:

```bash
SLACK_WEBHOOK_URL="https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK"
```

5. **Import in `app.module.ts`**:

```typescript
import { ContactModule } from './modules/contact/contact.module';

@Module({
  imports: [
    // ...
    ContactModule,
  ],
})
```

6. **Deploy**:

```bash
npm run build
npm run deploy:update
```

---

### Step 2: NPM Package (45 minutes)

```bash
mkdir /Users/trucupei/Projects/freehome/contact-form-package
cd /Users/trucupei/Projects/freehome/contact-form-package
```

1. **Initialize**:

```bash
npm init -y
npm install react react-dom @apollo/client graphql
npm install -D typescript @types/react @types/react-dom tsup
```

2. **Create structure**:

```
src/
├── components/ContactForm.tsx
├── hooks/useContactForm.ts
├── graphql/mutations.ts
├── types/index.ts
└── index.ts
```

3. **Update `package.json`**:

```json
{
  "name": "@freehome/contact-form",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts --clean"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "@apollo/client": "^4.0.0"
  }
}
```

4. **Build & publish**:

```bash
npm run build
npm publish --registry=https://npm.pkg.github.com
```

---

### Step 3: Frontend Integration (15 minutes each)

**In `frontend-home` and `reai_website`**:

1. **Install package**:

```bash
npm install @freehome/contact-form
```

2. **Add to `.env.local`**:

```bash
NEXT_PUBLIC_GRAPHQL_API_URL="http://localhost:4000/graphql"
```

3. **Create contact page**:

```tsx
// src/app/contact/page.tsx (frontend-home)
import { ContactForm } from '@freehome/contact-form';

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <ContactForm
        graphqlEndpoint={process.env.NEXT_PUBLIC_GRAPHQL_API_URL!}
        onSuccess={() => alert('Message sent!')}
        onError={(err) => alert('Failed: ' + err.message)}
      />
    </div>
  );
}
```

4. **Test**:

```bash
npm run dev
# Visit http://localhost:3000/contact
# Submit form
# Check Slack for notification
```

---

## 📁 File Reference

### GraphQL API Files

| File                                               | Purpose                  |
| -------------------------------------------------- | ------------------------ |
| `prisma/schema.prisma`                             | Database schema          |
| `src/modules/contact/contact.module.ts`            | Module registration      |
| `src/modules/contact/contact.resolver.ts`          | GraphQL mutation handler |
| `src/modules/contact/contact.service.ts`           | Business logic           |
| `src/modules/contact/notification.service.ts`      | Slack notifications      |
| `src/modules/contact/dto/contact-form.input.ts`    | Input validation         |
| `src/modules/contact/dto/contact-form.response.ts` | Response type            |

### NPM Package Files

| File                             | Purpose                     |
| -------------------------------- | --------------------------- |
| `src/components/ContactForm.tsx` | UI component                |
| `src/hooks/useContactForm.ts`    | Form state & submission     |
| `src/graphql/mutations.ts`       | GraphQL mutation definition |
| `src/types/index.ts`             | TypeScript types            |
| `src/index.ts`                   | Public exports              |

### Frontend Files

| File                       | Purpose                      |
| -------------------------- | ---------------------------- |
| `src/app/contact/page.tsx` | Contact page (frontend-home) |
| `.env.local`               | GraphQL API URL              |

---

## ✅ Testing Checklist

After implementation, verify:

- [ ] GraphQL API running: `curl http://localhost:4000/graphql`
- [ ] Supabase table exists: Check `contact_messages` in dashboard
- [ ] Package built: `ls contact-form-package/dist/`
- [ ] Package published: Check npm registry
- [ ] Frontend installs package: `npm list @freehome/contact-form`
- [ ] Form renders: Visit `/contact` page
- [ ] Form submits: Fill and submit form
- [ ] Data persists: Check Supabase table
- [ ] Slack notifies: Check Slack channel

---

## 🔧 Quick Troubleshooting

**Problem**: Package not found

```bash
# Solution: Configure npm registry
echo "@freehome:registry=https://npm.pkg.github.com" >> .npmrc
```

**Problem**: GraphQL mutation not found

```bash
# Solution: Restart GraphQL API
cd graphql-api && npm run start:dev
```

**Problem**: Slack notification not sent

```bash
# Solution: Check environment variable
cd graphql-api
cat .env | grep SLACK_WEBHOOK_URL
```

**Problem**: CORS error

```bash
# Solution: Add frontend URL to CORS_ORIGINS in graphql-api/.env
CORS_ORIGINS="http://localhost:3000,http://localhost:3001"
```

---

## 📚 Full Documentation

- **Architecture**: [CONTACT_FORM_ARCHITECTURE.md](./CONTACT_FORM_ARCHITECTURE.md)
- **Implementation Plan**: [CONTACT_FORM_IMPLEMENTATION_PLAN.md](./CONTACT_FORM_IMPLEMENTATION_PLAN.md)
- **GraphQL API Docs**: `/Users/trucupei/Projects/freehome/graphql-api/README.md`

---

## 🎯 Next Steps

After basic implementation works:

1. **Add validation** - Client-side + server-side
2. **Add tests** - Unit, integration, E2E
3. **Add styling** - Customize component appearance
4. **Add features**:
   - File attachments
   - reCAPTCHA
   - Auto-responses
   - Multiple form variants

---

## 💡 Key Benefits

✅ **Write once, use everywhere** - Both apps use same component
✅ **Single source of truth** - One place to update
✅ **Type-safe** - End-to-end TypeScript
✅ **Maintainable** - Clear separation of concerns
✅ **Scalable** - Easy to add more frontends

---

## 🆘 Need Help?

1. Check full documentation files above
2. Review GraphQL API logs: `cd graphql-api && npm run start:dev`
3. Check Supabase logs: https://supabase.com/dashboard/project/vsgdjiujtljilpunmvou
4. Check Slack webhook: Test in Postman with webhook URL
