# Strapi Content Types Setup Guide

This guide will help you set up the content types in Strapi admin panel.

## Accessing Strapi Admin

1. Start Strapi: `cd strapi && npm run develop`
2. Open http://localhost:1337/admin
3. Create an admin account on first run

## Content Types to Create

### 1. Portfolio Project (Collection Type)

**Fields:**
- `title` (Text, Short text) - Required
- `slug` (Text, Short text, Unique) - Required
- `description` (Text, Long text) - Required
- `fullDescription` (Rich text) - Required
- `techStack` (JSON) - Required
- `images` (Media, Multiple media) - Optional
- `impact` (JSON) - Optional (Array of objects with `metric` and `value`)
- `category` (Enumeration) - Required
  - Options: `mobile`, `saas`, `website`
- `publishedAt` (Date) - Auto-managed

**Settings:**
- Enable Draft & Publish
- Make slug field unique

### 2. Experience (Collection Type)

**Fields:**
- `company` (Text, Short text) - Required
- `logo` (Media, Single media) - Optional
- `role` (Text, Short text) - Required
- `startDate` (Date) - Required
- `endDate` (Date) - Optional
- `location` (Text, Short text) - Required
- `description` (Text, Long text) - Optional
- `skills` (JSON) - Optional (Array of strings)
- `current` (Boolean) - Required (default: false)
- `order` (Number, Integer) - Required (for sorting)
- `publishedAt` (Date) - Auto-managed

**Settings:**
- Enable Draft & Publish

### 3. Certificate (Collection Type)

**Fields:**
- `name` (Text, Short text) - Required
- `issuer` (Text, Short text) - Required
- `issueDate` (Date) - Required
- `credentialUrl` (Text, URL) - Optional
- `logo` (Media, Single media) - Optional
- `publishedAt` (Date) - Auto-managed

**Settings:**
- Enable Draft & Publish

### 4. Site Settings (Single Type)

**Fields:**
- `heroTitle` (Text, Short text) - Required
- `heroSubtitle` (Text, Long text) - Required
- `socialLinks` (JSON) - Required (Object with `linkedin`, `github`, `email`)
- `contactEmail` (Text, Email) - Required

**Settings:**
- Enable Draft & Publish

### 5. Blog Post (Collection Type - For Future)

**Fields:**
- `title` (Text, Short text) - Required
- `slug` (Text, Short text, Unique) - Required
- `excerpt` (Text, Long text) - Required
- `content` (Rich text) - Required
- `coverImage` (Media, Single media) - Optional
- `publishedAt` (Date) - Auto-managed
- `author` (Text, Short text) - Optional
- `tags` (JSON) - Optional (Array of strings)

**Settings:**
- Enable Draft & Publish

## API Permissions

After creating content types:

1. Go to Settings > Users & Permissions Plugin > Roles > Public
2. Enable the following permissions:
   - Portfolio Project: `find`, `findOne`
   - Experience: `find`, `findOne`
   - Certificate: `find`, `findOne`
   - Site Settings: `find`
   - Blog Post: `find`, `findOne` (for future)

## CORS Configuration

Update `strapi/config/middlewares.ts` to allow Next.js frontend:

```typescript
export default [
  // ... other middlewares
  {
    name: 'strapi::cors',
    config: {
      origin: ['http://localhost:3000'],
      credentials: true,
    },
  },
];
```

## Sample Data

After setting up content types, create sample entries in the admin panel to test the frontend integration.



