import posthog from 'posthog-js'

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    person_profiles: 'identified_only', // Only create profiles for identified users
    capture_pageview: true, // Automatically capture pageviews
    capture_pageleave: true, // Capture when users leave the page
    session_recording: {
        maskAllInputs: true, // Mask all input fields for privacy
        maskTextSelector: '[data-private]' // Mask elements with data-private attribute
    }
});
