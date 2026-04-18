# Shared Contact Form Module Architecture

## Overview

This document outlines the architecture for a **reusable contact form module** that can be shared between multiple FreeHome frontend applications through a private npm package. The module provides a complete contact form solution with data persistence and Slack notifications.

---

## 🎯 Goals

1. **Single Source of Truth**: Implement contact form logic once, use everywhere
2. **Centralized Backend Logic**: GraphQL API handles all business logic (storage, validation, notifications)
3. **Simple Integration**: Frontend applications import and use the component with minimal configuration
4. **Type Safety**: Full TypeScript support across the stack
5. **Consistency**: Same UX and behavior across all applications

---

## 🏗️ Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     Frontend Applications                        │
│                                                                  │
│  ┌─────────────────────┐      ┌─────────────────────┐          │
│  │  frontend-home      │      │  reai_website       │          │
│  │  (freehome.world)   │      │  (REAi Portal)      │          │
│  └──────────┬──────────┘      └──────────┬──────────┘          │
│             │                             │                      │
│             └──────────┬──────────────────┘                      │
│                        │                                         │
│                        │ npm install                             │
│                        ▼                                         │
│           ┌────────────────────────────┐                        │
│           │  @freehome/contact-form    │                        │
│           │  (Private NPM Package)     │                        │
│           │                            │                        │
│           │  • ContactForm Component   │                        │
│           │  • useContactForm Hook     │                        │
│           │  • GraphQL Mutation        │                        │
│           │  • TypeScript Types        │                        │
│           │  • Validation Logic        │                        │
│           └────────────┬───────────────┘                        │
│                        │                                         │
└────────────────────────┼─────────────────────────────────────────┘
                         │
                         │ GraphQL Mutation: submitContactForm
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    GraphQL API (NestJS)                          │
│             /Users/trucupei/Projects/freehome/graphql-api       │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Contact Module                                           │  │
│  │                                                           │  │
│  │  ┌─────────────────────────────────────────┐            │  │
│  │  │  contact.resolver.ts                    │            │  │
│  │  │  @Mutation('submitContactForm')         │            │  │
│  │  │  - Validates input                      │            │  │
│  │  │  - Calls service layer                  │            │  │
│  │  └─────────────────┬───────────────────────┘            │  │
│  │                    │                                      │  │
│  │                    ▼                                      │  │
│  │  ┌─────────────────────────────────────────┐            │  │
│  │  │  contact.service.ts                     │            │  │
│  │  │  - Stores in Supabase via Prisma        │            │  │
│  │  │  - Calls notification service           │            │  │
│  │  └─────────────────┬───────────────────────┘            │  │
│  │                    │                                      │  │
│  │                    ▼                                      │  │
│  │  ┌─────────────────────────────────────────┐            │  │
│  │  │  notification.service.ts                │            │  │
│  │  │  - Sends Slack webhook notification     │            │  │
│  │  │  - Formats message                      │            │  │
│  │  │  - Handles errors gracefully            │            │  │
│  │  └─────────────────────────────────────────┘            │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│                         │                                        │
│                         ▼                                        │
│                  ┌──────────────┐                               │
│                  │  Prisma ORM  │                               │
│                  └──────┬───────┘                               │
└─────────────────────────┼────────────────────────────────────────┘
                          │
                          ▼
               ┌──────────────────────┐
               │  Supabase Database   │
               │  contact_messages    │
               │  table               │
               └──────────────────────┘
                          │
                          │ Success → Trigger
                          ▼
               ┌──────────────────────┐
               │  Slack Workspace     │
               │  (Webhook)           │
               └──────────────────────┘
```

---

## 📦 Package Structure: `@freehome/contact-form`

```
@freehome/contact-form/
├── src/
│   ├── components/
│   │   └── ContactForm.tsx          # Main form component (UI + logic)
│   ├── hooks/
│   │   └── useContactForm.ts        # Form state management hook
│   ├── graphql/
│   │   ├── mutations.ts             # GraphQL mutation definitions
│   │   └── types.ts                 # Generated GraphQL types
│   ├── types/
│   │   └── index.ts                 # TypeScript interfaces
│   ├── validation/
│   │   └── schema.ts                # Form validation rules
│   └── index.ts                     # Public API exports
├── package.json
├── tsconfig.json
├── README.md
└── .npmrc                            # Private registry config
```

### Key Files

#### `src/components/ContactForm.tsx`

```tsx
import { useContactForm } from '../hooks/useContactForm';
import { ContactFormProps, ContactFormData } from '../types';

export function ContactForm({ onSuccess, onError, className, graphqlEndpoint }: ContactFormProps) {
  const { formData, errors, isSubmitting, handleChange, handleSubmit } = useContactForm({
    graphqlEndpoint,
    onSuccess,
    onError,
  });

  return (
    <form onSubmit={handleSubmit} className={className}>
      {/* Form fields with styling */}
      <input name="name" value={formData.name} onChange={handleChange} required />
      {/* ... other fields ... */}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
```

#### `src/hooks/useContactForm.ts`

```tsx
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SUBMIT_CONTACT_FORM } from '../graphql/mutations';
import { validateContactForm } from '../validation/schema';

export function useContactForm(config) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [submitMutation, { loading, error }] = useMutation(SUBMIT_CONTACT_FORM, {
    context: { uri: config.graphqlEndpoint },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    const errors = validateContactForm(formData);
    if (errors) {
      config.onError?.(errors);
      return;
    }

    try {
      const result = await submitMutation({
        variables: { input: formData },
      });

      config.onSuccess?.(result.data);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      config.onError?.(err);
    }
  };

  return { formData, errors, isSubmitting: loading, handleChange, handleSubmit };
}
```

#### `src/graphql/mutations.ts`

```tsx
import { gql } from '@apollo/client';

export const SUBMIT_CONTACT_FORM = gql`
  mutation SubmitContactForm($input: ContactFormInput!) {
    submitContactForm(input: $input) {
      success
      message
      contactId
    }
  }
`;
```

#### `src/types/index.ts`

```tsx
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface ContactFormProps {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  className?: string;
  graphqlEndpoint: string;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
  contactId?: string;
}
```

---

## 🔧 GraphQL API Implementation

### Module Structure

```
graphql-api/src/modules/contact/
├── contact.module.ts
├── contact.resolver.ts
├── contact.service.ts
├── notification.service.ts
├── dto/
│   └── contact-form.input.ts
└── entities/
    └── contact-message.entity.ts
```

### GraphQL Schema

```graphql
# schema.graphql

input ContactFormInput {
  name: String!
  email: String!
  phone: String
  message: String!
}

type ContactFormResponse {
  success: Boolean!
  message: String!
  contactId: String
}

type Mutation {
  submitContactForm(input: ContactFormInput!): ContactFormResponse!
}
```

### Resolver Implementation

```typescript
// contact.resolver.ts
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ContactService } from './contact.service';
import { ContactFormInput } from './dto/contact-form.input';
import { ContactFormResponse } from './dto/contact-form.response';
import { Public } from '@shared/decorators/public.decorator';

@Resolver()
export class ContactResolver {
  constructor(private readonly contactService: ContactService) {}

  @Public() // No authentication required
  @Mutation(() => ContactFormResponse)
  async submitContactForm(@Args('input') input: ContactFormInput): Promise<ContactFormResponse> {
    try {
      const contact = await this.contactService.createContact(input);

      // Send Slack notification asynchronously (don't block response)
      this.contactService.sendNotification(contact).catch((err) => {
        console.error('Failed to send Slack notification:', err);
      });

      return {
        success: true,
        message: 'Your message has been received. We will contact you soon!',
        contactId: contact.id,
      };
    } catch (error) {
      console.error('Contact form submission error:', error);
      return {
        success: false,
        message: 'Failed to submit contact form. Please try again later.',
      };
    }
  }
}
```

### Service Implementation

```typescript
// contact.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { NotificationService } from './notification.service';
import { ContactFormInput } from './dto/contact-form.input';

@Injectable()
export class ContactService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationService: NotificationService
  ) {}

  async createContact(input: ContactFormInput) {
    // Store in Supabase via Prisma
    const contact = await this.prisma.contact_messages.create({
      data: {
        name: input.name,
        email: input.email,
        phone: input.phone,
        message: input.message,
        created_at: new Date(),
      },
    });

    return contact;
  }

  async sendNotification(contact: any): Promise<void> {
    await this.notificationService.sendSlackNotification({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      message: contact.message,
      contactId: contact.id,
    });
  }
}
```

### Notification Service

```typescript
// notification.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationService {
  private readonly slackWebhookUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.slackWebhookUrl = this.configService.get<string>('SLACK_WEBHOOK_URL');
  }

  async sendSlackNotification(data: {
    name: string;
    email: string;
    phone?: string;
    message: string;
    contactId: string;
  }): Promise<void> {
    if (!this.slackWebhookUrl) {
      console.warn('Slack webhook URL not configured');
      return;
    }

    const slackMessage = {
      text: '🔔 New Contact Form Submission',
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '🔔 New Contact Form Submission',
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
              text: `*Email:*\n${data.email}`,
            },
            {
              type: 'mrkdwn',
              text: `*Phone:*\n${data.phone || 'N/A'}`,
            },
            {
              type: 'mrkdwn',
              text: `*Contact ID:*\n${data.contactId}`,
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
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: `Submitted at: <!date^${Math.floor(Date.now() / 1000)}^{date_num} {time_secs}|${new Date().toISOString()}>`,
            },
          ],
        },
      ],
    };

    const response = await fetch(this.slackWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(slackMessage),
    });

    if (!response.ok) {
      throw new Error(`Slack notification failed: ${response.statusText}`);
    }
  }
}
```

---

## 🗄️ Database Schema

### Supabase Table: `contact_messages`

```sql
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX idx_contact_messages_email ON contact_messages(email);

-- Enable Row Level Security (optional)
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Policy: Allow API to insert (using service role)
CREATE POLICY "API can insert contact messages"
  ON contact_messages
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Policy: Allow API to read (using service role)
CREATE POLICY "API can read contact messages"
  ON contact_messages
  FOR SELECT
  TO service_role
  USING (true);
```

### Prisma Schema

```prisma
// schema.prisma

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

---

## 🔐 Environment Variables

### GraphQL API (`.env`)

```bash
# Supabase Connection
DATABASE_URL="postgresql://postgres:[password]@[project-ref].supabase.co:5432/postgres"

# Slack Webhook
SLACK_WEBHOOK_URL="https://hooks.slack.com/services/YOUR/WEBHOOK/URL"

# CORS (allow both frontend applications)
CORS_ORIGINS="http://localhost:3000,http://localhost:3001,https://freehome.world,https://portal.reai.co"
```

### Frontend Applications (`.env.local`)

```bash
# GraphQL API Endpoint
NEXT_PUBLIC_GRAPHQL_API_URL="https://api.freehome.world/graphql"
# or for development:
# NEXT_PUBLIC_GRAPHQL_API_URL="http://localhost:4000/graphql"
```

---

## 📚 Integration Guide

### Step 1: Install the Package

```bash
# In frontend-home or reai_website
npm install @freehome/contact-form

# If using private npm registry
npm install @freehome/contact-form --registry=https://npm.pkg.github.com
```

### Step 2: Wrap App with Apollo Provider

Both applications already use Apollo Client, so ensure the GraphQL endpoint is configured:

```tsx
// src/lib/apollo-client.ts (or equivalent)
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
```

### Step 3: Use the ContactForm Component

```tsx
// src/app/contact/page.tsx (frontend-home)
// or src/pages/contact.tsx (reai_website)

import { ContactForm } from '@freehome/contact-form';
import { useRouter } from 'next/navigation';

export default function ContactPage() {
  const router = useRouter();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <ContactForm
        graphqlEndpoint={process.env.NEXT_PUBLIC_GRAPHQL_API_URL!}
        onSuccess={(data) => {
          console.log('Form submitted successfully:', data);
          // Show success message or redirect
          alert('Thank you! We will contact you soon.');
        }}
        onError={(error) => {
          console.error('Form submission failed:', error);
          alert('Failed to submit form. Please try again.');
        }}
        className="space-y-4"
      />
    </div>
  );
}
```

---

## 🚀 Deployment Flow

### 1. GraphQL API Deployment

```bash
cd /Users/trucupei/Projects/freehome/graphql-api

# Generate Prisma client with new schema
npm run prisma:generate

# Build and deploy
npm run build
npm run deploy:update
```

### 2. Package Publication

```bash
cd @freehome/contact-form

# Build the package
npm run build

# Publish to private registry
npm publish --registry=https://npm.pkg.github.com
```

### 3. Frontend Applications Update

```bash
# In frontend-home
cd /Users/trucupei/Projects/freehome/flow/frontend-home
npm update @freehome/contact-form
npm run build

# In reai_website
cd /Users/trucupei/Projects/freehome/flow/reai_website
npm update @freehome/contact-form
npm run build
```

---

## ✅ Benefits of This Architecture

1. **DRY Principle**: Contact form logic written once, maintained in one place
2. **Type Safety**: End-to-end TypeScript from frontend to backend
3. **Centralized Logic**: All business rules (validation, storage, notifications) in GraphQL API
4. **Easy Updates**: Update package once, all applications get the fix
5. **Consistent UX**: Same form behavior and styling across all applications
6. **Scalability**: Easy to add new frontends or modify logic
7. **Separation of Concerns**: Frontend handles UI, backend handles business logic
8. **Testability**: Each layer can be tested independently
9. **Error Handling**: Centralized error handling and logging
10. **Performance**: GraphQL API handles heavy lifting, frontend stays lightweight

---

## 🧪 Testing Strategy

### Unit Tests

- Package: Test `useContactForm` hook logic
- API: Test resolver, service, notification service

### Integration Tests

- Test GraphQL mutation end-to-end
- Test Slack webhook integration
- Test database persistence

### E2E Tests

- Test form submission from frontend applications
- Verify success/error states
- Verify Slack notifications received

---

## 📝 Implementation Checklist

### GraphQL API Tasks

- [ ] Create `contact` module in GraphQL API
- [ ] Define GraphQL schema (mutation + types)
- [ ] Implement resolver with `@Public()` decorator
- [ ] Implement contact service (Prisma integration)
- [ ] Implement notification service (Slack webhook)
- [ ] Create Supabase migration for `contact_messages` table
- [ ] Update Prisma schema
- [ ] Add environment variables
- [ ] Write unit tests
- [ ] Deploy to production

### NPM Package Tasks

- [ ] Initialize `@freehome/contact-form` package
- [ ] Create ContactForm component
- [ ] Create useContactForm hook
- [ ] Define GraphQL mutations
- [ ] Add validation logic
- [ ] Add TypeScript types
- [ ] Configure package.json (private registry)
- [ ] Write README with usage examples
- [ ] Publish to private npm registry

### Frontend Integration Tasks

- [ ] Install package in `frontend-home`
- [ ] Install package in `reai_website`
- [ ] Create contact pages using the component
- [ ] Configure environment variables
- [ ] Test form submission
- [ ] Test success/error handling
- [ ] Test Slack notifications
- [ ] Update documentation

---

## 🔄 Future Enhancements

1. **Email Notifications**: Add email service alongside Slack
2. **Form Variants**: Support different form layouts (minimal, full, popup)
3. **Attachments**: Allow file uploads with contact forms
4. **Analytics**: Track form submissions and conversion rates
5. **A/B Testing**: Support multiple form variations
6. **Internationalization**: Multi-language support
7. **Spam Protection**: Add reCAPTCHA or honeypot fields
8. **Auto-responses**: Send confirmation email to user
9. **CRM Integration**: Sync with Salesforce/HubSpot
10. **Admin Dashboard**: View and manage contact submissions

---

## 📖 Related Documentation

- [GraphQL API Documentation](/Users/trucupei/Projects/freehome/graphql-api/README.md)
- [Frontend Home Documentation](./README.md)
- [REAi Website Documentation](/Users/trucupei/Projects/freehome/flow/reai_website/README.md)
- Prisma Schema: `/Users/trucupei/Projects/freehome/graphql-api/prisma/schema.prisma`
- Supabase Project: `https://supabase.com/dashboard/project/vsgdjiujtljilpunmvou`
