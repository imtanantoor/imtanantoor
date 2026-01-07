export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: [
        'http://localhost:3000', // Local development
        'https://main.d34wwwwm8ixeus.amplifyapp.com', // Production frontend
        // 'https://your-production-domain.com',
        // 'https://www.your-production-domain.com',
        // Or use environment variable: process.env.CORS_ORIGIN?.split(',') || []
      ],
      credentials: true,
      headers: ['Content-Type', 'Authorization', 'X-Requested-With'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
