# Portfolio Website

A minimalistic, professional portfolio website built with Next.js 16, React 19, TypeScript, and Strapi CMS. Features a clean grayscale design with subtle animations, reflecting a competitive, disciplined, and creative personality.

## Features

- **Modern Stack**: Next.js 16, React 19, TypeScript, Tailwind CSS v4
- **Headless CMS**: Strapi integration for easy content management
- **Responsive Design**: Mobile-first, works across all devices
- **Performance**: Optimized images, static generation, and incremental regeneration
- **Animations**: Subtle micro-interactions using Framer Motion
- **SEO Optimized**: Proper metadata and semantic HTML

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **CMS**: Strapi v5
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Deployment**: Ready for Vercel, AWS, or any Node.js hosting

## Getting Started

### Prerequisites

- Node.js 18+ 
- Yarn (package manager)
- Strapi will use SQLite by default (can be configured for PostgreSQL)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd imtanantoor
   ```

2. **Install dependencies**
   ```bash
   # Install Next.js dependencies
   yarn install
   
   # Install Strapi dependencies
   cd strapi
   yarn install
   cd ..
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337/api
   ```

4. **Start Strapi CMS**
   ```bash
   cd strapi
   yarn develop
   ```
   
   - Open http://localhost:1337/admin
   - Create an admin account
   - Follow the setup guide in `strapi/CONTENT_TYPES_SETUP.md` to create content types

5. **Start Next.js development server**
   ```bash
   # In the root directory
   yarn dev
   ```
   
   - Open http://localhost:3000

## Project Structure

```
imtanantoor/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/        # React components
│   └── lib/
│       └── strapi/        # Strapi API integration
├── strapi/               # Strapi CMS
│   ├── src/
│   │   └── api/         # Content types (created via admin)
│   └── config/          # Strapi configuration
└── public/              # Static assets
```

## Content Types

The following content types need to be created in Strapi:

1. **Portfolio Project** - Collection type for portfolio projects
2. **Experience** - Collection type for work experience
3. **Certificate** - Collection type for certifications
4. **Site Settings** - Single type for site configuration
5. **Blog Post** - Collection type (for future blog feature)

See `strapi/CONTENT_TYPES_SETUP.md` for detailed setup instructions.

## Development

### Running in Development

```bash
# Terminal 1: Start Strapi
cd strapi && yarn develop

# Terminal 2: Start Next.js
yarn dev
```

### Building for Production

```bash
# Build Next.js
yarn build

# Start production server
yarn start
```

## Customization

### Colors

The grayscale color palette is defined in `src/app/globals.css`:
- Lightest: `#F8F9FA`
- Darkest: `#212529`

### Fonts

- Primary: Inter (body text)
- Headings: Poppins (bold, disciplined look)

Configured in `src/app/layout.tsx`

### Content

All content is managed through Strapi CMS. No code changes needed to update:
- Portfolio projects
- Work experience
- Certificates
- Hero section content
- Social links

## Deployment

### Strapi Deployment

Strapi can be deployed separately:
- **Strapi Cloud**: Easiest option
- **Self-hosted**: VPS, AWS, Railway, etc.
- Update `NEXT_PUBLIC_STRAPI_API_URL` in production environment

### Next.js Deployment

- **Vercel**: Recommended, automatic deployments
- **AWS**: Use Amplify or EC2
- **Any Node.js hosting**: Build and deploy

### Environment Variables

Make sure to set:
- `NEXT_PUBLIC_STRAPI_API_URL` - Your Strapi API URL

## Features in Detail

### Portfolio Section
- Grid layout of project cards
- Individual project detail pages
- Tech stack tags
- Impact metrics
- Image galleries

### Experience Timeline
- Chronological work experience
- Company logos
- Skills and achievements
- Responsive card layout

### Contact Form
- Ready for integration with:
  - Formspree
  - EmailJS
  - Custom API route
  - SendGrid/Mailgun

## Future Enhancements

- Blog functionality (structure already prepared)
- Dark mode toggle
- Portfolio filtering by category
- Search functionality
- Analytics integration

## License

Private project - All rights reserved

## Support

For issues or questions, please open an issue in the repository.
