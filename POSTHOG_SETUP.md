# PostHog Analytics Setup

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
NEXT_PUBLIC_POSTHOG_KEY=###############################
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

## Files Created

1. `instrumentation-client.js` - PostHog initialization for Next.js 15.3+
2. `.env.local` - Environment variables (you need to create this manually)

## Deployment

When deploying to your hosting provider (Vercel, Netlify, AWS, etc.), make sure to add these environment variables:

- `NEXT_PUBLIC_POSTHOG_KEY`: Your PostHog project API key
- `NEXT_PUBLIC_POSTHOG_HOST`: Your PostHog host URL

## Verification

After setup, PostHog will automatically track page views and user interactions. You can verify the integration by:

1. Running your development server: `npm run dev`
2. Opening your browser's developer tools
3. Checking the Network tab for requests to PostHog
4. Viewing your PostHog dashboard for incoming events

## Next Steps

Consider adding custom events for better analytics:

```javascript
import posthog from 'posthog-js'

// Track custom events
posthog.capture('button_clicked', { button_name: 'contact_form' })
posthog.capture('project_viewed', { project_name: 'portfolio_website' })
```
