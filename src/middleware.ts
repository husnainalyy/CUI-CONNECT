import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define public routes (no authentication required)
const isPublicRoute = createRouteMatcher([
    '/',
    '/events/:id',
    '/api/webhook/clerk',
    '/api/webhook/stripe',
    '/api/uploadthing',
    '/sign-in',  // Add sign-in route if it's public
    '/sign-up'   // Add sign-up route if it's public
]);

// Define ignored routes (routes that should be public and bypass authentication)
const isIgnoredRoute = createRouteMatcher([
    // Add any routes that should be bypassed by authentication here
]);

export default clerkMiddleware((auth, req) => {
    // Protect routes not in the public or ignored route list
    if (!isPublicRoute(req) && !isIgnoredRoute(req)) {
        auth().protect();  // Protect routes that require authentication
    }
});

export const config = {
    matcher: [
        // Apply middleware to all routes except static files and Next.js internals
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always apply middleware to API routes
        '/(api|trpc)(.*)',
    ],
};
