# Contact Form Implementation Plan

## Overview

This document provides a **step-by-step implementation plan** for building the shared contact form module as described in [CONTACT_FORM_ARCHITECTURE.md](./CONTACT_FORM_ARCHITECTURE.md).

---

## 📋 Implementation Phases

### Phase 1: GraphQL API Backend (Priority: HIGH)

**Estimated Time**: 4-6 hours
**Location**: `/Users/trucupei/Projects/freehome/graphql-api`

### Phase 2: NPM Package Development (Priority: HIGH)

**Estimated Time**: 3-4 hours
**Location**: `/Users/trucupei/Projects/freehome/contact-form-package` (new repo)

### Phase 3: Frontend Integration (Priority: MEDIUM)

**Estimated Time**: 2-3 hours
**Location**: Both frontend applications

### Phase 4: Testing & Deployment (Priority: HIGH)

**Estimated Time**: 2-3 hours
**Location**: All projects

---

## Phase 1: GraphQL API Backend Implementation

### 1.1 Database Setup

**File**: `/Users/trucupei/Projects/freehome/graphql-api/prisma/schema.prisma`

**Actions**:

1. Add `contact_messages` model to Prisma schema
2. Run Prisma migration to create table
3. Generate Prisma client

**Commands**:

```bash
cd /Users/trucupei/Projects/freehome/graphql-api

# Add model to schema.prisma
# Then generate migration
npx prisma migrate dev --name add_contact_messages

# Generate Prisma client
npm run prisma:generate
```

**Prisma Model**:

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
  @@map("contact_messages")
}
```

**Verification**:

- [ ] Table exists in Supabase
- [ ] Indexes are created
- [ ] Prisma client generates types

---

### 1.2 Create Contact Module

**Directory**: `/Users/trucupei/Projects/freehome/graphql-api/src/modules/contact/`

**Files to Create**:

```
contact/
├── contact.module.ts
├── contact.resolver.ts
├── contact.service.ts
├── notification.service.ts
├── dto/
│   ├── contact-form.input.ts
│   └── contact-form.response.ts
└── __tests__/
    ├── contact.resolver.spec.ts
    └── contact.service.spec.ts
```

---

#### 1.2.1 DTOs (Data Transfer Objects)

**File**: `dto/contact-form.input.ts`

```typescript
import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

@InputType()
export class ContactFormInput {
  @Field()
  @IsNotEmpty({ message: 'Name is required' })
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  name: string;

  @Field()
  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @Field({ nullable: true })
  @IsOptional()
  phone?: string;

  @Field()
  @IsNotEmpty({ message: 'Message is required' })
  @MinLength(10, { message: 'Message must be at least 10 characters' })
  message: string;
}
```

**File**: `dto/contact-form.response.ts`

```typescript
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ContactFormResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;

  @Field({ nullable: true })
  contactId?: string;
}
```

---

#### 1.2.2 Notification Service

**File**: `notification.service.ts`

```typescript
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface SlackNotificationData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  contactId: string;
}

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);
  private readonly slackWebhookUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.slackWebhookUrl = this.configService.get<string>('SLACK_WEBHOOK_URL');

    if (!this.slackWebhookUrl) {
      this.logger.warn('SLACK_WEBHOOK_URL not configured. Slack notifications will be disabled.');
    }
  }

  async sendSlackNotification(data: SlackNotificationData): Promise<boolean> {
    if (!this.slackWebhookUrl) {
      this.logger.warn('Skipping Slack notification - webhook URL not configured');
      return false;
    }

    try {
      const slackMessage = this.formatSlackMessage(data);

      const response = await fetch(this.slackWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slackMessage),
      });

      if (!response.ok) {
        throw new Error(`Slack API error: ${response.status} ${response.statusText}`);
      }

      this.logger.log(`Slack notification sent successfully for contact ${data.contactId}`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to send Slack notification: ${error.message}`, error.stack);
      return false;
    }
  }

  private formatSlackMessage(data: SlackNotificationData) {
    return {
      text: '🔔 New Contact Form Submission',
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '🔔 New Contact Form Submission',
            emoji: true,
          },
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Name:*\n${data.name}`,
            },
            {
              type: 'mrkdwn',
              text: `*Email:*\n<mailto:${data.email}|${data.email}>`,
            },
          ],
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Phone:*\n${data.phone || 'N/A'}`,
            },
            {
              type: 'mrkdwn',
              text: `*Contact ID:*\n\`${data.contactId}\``,
            },
          ],
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Message:*\n${data.message}`,
          },
        },
        {
          type: 'divider',
        },
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: `Submitted: <!date^${Math.floor(Date.now() / 1000)}^{date_num} at {time_secs}|${new Date().toISOString()}>`,
            },
          ],
        },
      ],
    };
  }
}
```

---

#### 1.2.3 Contact Service

**File**: `contact.service.ts`

```typescript
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { NotificationService } from './notification.service';
import { ContactFormInput } from './dto/contact-form.input';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationService: NotificationService
  ) {}

  async createContact(input: ContactFormInput) {
    this.logger.log(`Creating contact message from ${input.email}`);

    try {
      const contact = await this.prisma.contact_messages.create({
        data: {
          name: input.name,
          email: input.email,
          phone: input.phone,
          message: input.message,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });

      this.logger.log(`Contact message created with ID: ${contact.id}`);
      return contact;
    } catch (error) {
      this.logger.error(`Failed to create contact message: ${error.message}`, error.stack);
      throw new Error('Failed to save contact message');
    }
  }

  async sendNotification(contact: any): Promise<void> {
    // Send notification asynchronously - don't block on this
    this.notificationService
      .sendSlackNotification({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        message: contact.message,
        contactId: contact.id,
      })
      .catch((err) => {
        this.logger.error(`Failed to send notification for contact ${contact.id}:`, err);
      });
  }
}
```

---

#### 1.2.4 Contact Resolver

**File**: `contact.resolver.ts`

```typescript
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactFormInput } from './dto/contact-form.input';
import { ContactFormResponse } from './dto/contact-form.response';
import { Public } from '@shared/decorators/public.decorator';

@Resolver()
export class ContactResolver {
  private readonly logger = new Logger(ContactResolver.name);

  constructor(private readonly contactService: ContactService) {}

  @Public() // This endpoint does not require authentication
  @Mutation(() => ContactFormResponse)
  async submitContactForm(@Args('input') input: ContactFormInput): Promise<ContactFormResponse> {
    this.logger.log(`Received contact form submission from ${input.email}`);

    try {
      // Create contact in database
      const contact = await this.contactService.createContact(input);

      // Send Slack notification (async, non-blocking)
      this.contactService.sendNotification(contact);

      return {
        success: true,
        message: 'Your message has been received. We will contact you soon!',
        contactId: contact.id,
      };
    } catch (error) {
      this.logger.error(`Contact form submission failed: ${error.message}`, error.stack);

      return {
        success: false,
        message: 'Failed to submit contact form. Please try again later.',
        contactId: null,
      };
    }
  }
}
```

---

#### 1.2.5 Contact Module

**File**: `contact.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ContactResolver } from './contact.resolver';
import { ContactService } from './contact.service';
import { NotificationService } from './notification.service';
import { DatabaseModule } from '@database/database.module';

@Module({
  imports: [ConfigModule, DatabaseModule],
  providers: [ContactResolver, ContactService, NotificationService],
  exports: [ContactService],
})
export class ContactModule {}
```

---

### 1.3 Update App Module

**File**: `/Users/trucupei/Projects/freehome/graphql-api/src/app.module.ts`

**Action**: Import and register `ContactModule`

```typescript
import { ContactModule } from './modules/contact/contact.module';

@Module({
  imports: [
    // ... existing modules
    ContactModule,
  ],
  // ...
})
export class AppModule {}
```

---

### 1.4 Environment Variables

**File**: `/Users/trucupei/Projects/freehome/graphql-api/.env`

**Add**:

```bash
# Slack Notifications
SLACK_WEBHOOK_URL="https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK"

# CORS (allow both frontends)
CORS_ORIGINS="http://localhost:3000,http://localhost:3001,https://freehome.world,https://portal.reai.co"
```

---

### 1.5 Testing

**File**: `contact/__tests__/contact.service.spec.ts`

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { ContactService } from '../contact.service';
import { PrismaService } from '@database/prisma.service';
import { NotificationService } from '../notification.service';

describe('ContactService', () => {
  let service: ContactService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactService,
        {
          provide: PrismaService,
          useValue: {
            contact_messages: {
              create: jest.fn(),
            },
          },
        },
        {
          provide: NotificationService,
          useValue: {
            sendSlackNotification: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ContactService>(ContactService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a contact message', async () => {
    const input = {
      name: 'Test User',
      email: 'test@example.com',
      message: 'Test message',
    };

    const mockContact = { id: 'test-id', ...input };
    jest.spyOn(prismaService.contact_messages, 'create').mockResolvedValue(mockContact as any);

    const result = await service.createContact(input);

    expect(result).toEqual(mockContact);
    expect(prismaService.contact_messages.create).toHaveBeenCalledWith({
      data: expect.objectContaining(input),
    });
  });
});
```

**Run Tests**:

```bash
npm run test -- contact.service.spec
```

---

### 1.6 Deployment

```bash
cd /Users/trucupei/Projects/freehome/graphql-api

# Run tests
npm run test

# Build
npm run build

# Deploy (adjust based on your deployment strategy)
npm run deploy:update
```

**Verification Checklist**:

- [ ] GraphQL playground accessible
- [ ] `submitContactForm` mutation visible in schema
- [ ] Test mutation manually in playground
- [ ] Check Supabase table for new records
- [ ] Verify Slack notification received

---

## Phase 2: NPM Package Development

### 2.1 Initialize Package

**Location**: Create new repository `/Users/trucupei/Projects/freehome/contact-form-package`

```bash
mkdir -p /Users/trucupei/Projects/freehome/contact-form-package
cd /Users/trucupei/Projects/freehome/contact-form-package

# Initialize npm package
npm init -y

# Install dependencies
npm install react react-dom @apollo/client graphql
npm install -D typescript @types/react @types/react-dom @types/node
npm install -D tsup prettier eslint

# Initialize TypeScript
npx tsc --init
```

---

### 2.2 Package Structure

Create the following directory structure:

```
contact-form-package/
├── src/
│   ├── components/
│   │   ├── ContactForm.tsx
│   │   └── ContactForm.module.css
│   ├── hooks/
│   │   └── useContactForm.ts
│   ├── graphql/
│   │   ├── mutations.ts
│   │   └── types.ts
│   ├── types/
│   │   └── index.ts
│   ├── validation/
│   │   └── schema.ts
│   └── index.ts
├── package.json
├── tsconfig.json
├── .npmrc
└── README.md
```

---

### 2.3 Package Configuration

**File**: `package.json`

```json
{
  "name": "@freehome/contact-form",
  "version": "1.0.0",
  "description": "Shared contact form component for FreeHome applications",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "require": "./dist/index.js",
      "import": "./dist/index.mjs",
      "types": "./dist/index.d.ts"
    }
  },
  "files": ["dist"],
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts --clean",
    "dev": "tsup src/index.ts --format cjs,esm --dts --watch",
    "lint": "eslint src/**/*.{ts,tsx}",
    "format": "prettier --write \"src/**/*.{ts,tsx}\""
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@apollo/client": "^4.0.0",
    "graphql": "^16.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "typescript": "^5.0.0",
    "tsup": "^8.0.0",
    "prettier": "^3.0.0",
    "eslint": "^9.0.0"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/freehome/contact-form.git"
  },
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

**File**: `.npmrc`

```
@freehome:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

**File**: `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM"],
    "jsx": "react-jsx",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

---

### 2.4 Implementation Files

**(Files are too long to include here, refer to CONTACT_FORM_ARCHITECTURE.md for full implementations)**

Key files to implement:

- [ ] `src/types/index.ts` - TypeScript interfaces
- [ ] `src/graphql/mutations.ts` - GraphQL mutation
- [ ] `src/validation/schema.ts` - Form validation
- [ ] `src/hooks/useContactForm.ts` - Form logic hook
- [ ] `src/components/ContactForm.tsx` - Main component
- [ ] `src/index.ts` - Public API exports

---

### 2.5 Build and Publish

```bash
cd /Users/trucupei/Projects/freehome/contact-form-package

# Build package
npm run build

# Test build output
ls -la dist/

# Login to GitHub Packages (if not already)
npm login --registry=https://npm.pkg.github.com

# Publish
npm publish
```

**Verification**:

- [ ] Package builds successfully
- [ ] Type definitions generated
- [ ] Published to registry

---

## Phase 3: Frontend Integration

### 3.1 Install Package

**In `frontend-home`**:

```bash
cd /Users/trucupei/Projects/freehome/flow/frontend-home
npm install @freehome/contact-form
```

**In `reai_website`**:

```bash
cd /Users/trucupei/Projects/freehome/flow/reai_website
npm install @freehome/contact-form
```

---

### 3.2 Update Environment Variables

**Both applications** - Add to `.env.local`:

```bash
NEXT_PUBLIC_GRAPHQL_API_URL="http://localhost:4000/graphql"
# or production:
# NEXT_PUBLIC_GRAPHQL_API_URL="https://api.freehome.world/graphql"
```

---

### 3.3 Implement Contact Page

**For `frontend-home`** (`src/app/contact/page.tsx`):

```tsx
import { ContactForm } from '@freehome/contact-form';

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-2xl py-12 px-4">
      <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
      <p className="text-gray-600 mb-8">Have a question? We'd love to hear from you.</p>

      <ContactForm
        graphqlEndpoint={process.env.NEXT_PUBLIC_GRAPHQL_API_URL!}
        onSuccess={(data) => {
          console.log('Success:', data);
          alert('Thank you! We will contact you soon.');
        }}
        onError={(error) => {
          console.error('Error:', error);
          alert('Failed to submit. Please try again.');
        }}
        className="bg-white shadow-lg rounded-lg p-8"
      />
    </div>
  );
}
```

**For `reai_website`** (similar implementation):

```tsx
// Adjust based on their routing structure (Pages Router vs App Router)
```

---

### 3.4 Test Integration

```bash
# Start GraphQL API
cd /Users/trucupei/Projects/freehome/graphql-api
npm run start:dev

# Start frontend-home
cd /Users/trucupei/Projects/freehome/flow/frontend-home
npm run dev

# Navigate to http://localhost:3000/contact
# Submit test form
```

**Verification**:

- [ ] Form renders correctly
- [ ] Validation works
- [ ] Form submits successfully
- [ ] Success message displays
- [ ] Check Supabase for record
- [ ] Check Slack for notification

---

## Phase 4: Testing & Deployment

### 4.1 End-to-End Testing

**Test Scenarios**:

1. Valid form submission → Success
2. Invalid email → Validation error
3. Empty fields → Validation errors
4. Network error → Error handling
5. Slack webhook failure → Graceful degradation

---

### 4.2 Production Deployment

**Steps**:

1. Deploy GraphQL API with new endpoint
2. Verify production Supabase table exists
3. Configure production Slack webhook
4. Publish npm package (production version)
5. Update frontend applications
6. Deploy frontend applications
7. Test production contact forms

---

## 📊 Progress Tracking

### GraphQL API

- [ ] Database schema created
- [ ] Prisma migration run
- [ ] Contact module implemented
- [ ] Notification service implemented
- [ ] Tests written and passing
- [ ] Environment variables configured
- [ ] Deployed to production

### NPM Package

- [ ] Package initialized
- [ ] Components implemented
- [ ] Hooks implemented
- [ ] Types defined
- [ ] Built successfully
- [ ] Published to registry

### Frontend Integration

- [ ] Package installed in frontend-home
- [ ] Package installed in reai_website
- [ ] Contact pages created
- [ ] Environment variables set
- [ ] Local testing complete
- [ ] Production deployment complete

### Testing

- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] E2E tests passing
- [ ] Manual testing complete
- [ ] Slack notifications working

---

## 🎯 Success Criteria

- ✅ Contact form works in both applications
- ✅ Data persists to Supabase
- ✅ Slack notifications received
- ✅ Type-safe end-to-end
- ✅ No code duplication
- ✅ Easy to maintain and update

---

## 📞 Support & Questions

For questions or issues during implementation:

- Check [CONTACT_FORM_ARCHITECTURE.md](./CONTACT_FORM_ARCHITECTURE.md) for architecture details
- Review GraphQL API logs
- Check Supabase dashboard
- Review Slack webhook delivery logs
