import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';

// Define public routes (no authentication required)
const isPublicRoute = createRouteMatcher([
    '/',
    '/sign-in',
    '/sign-up',
    '/api/webhook/clerk',
    '/api/webhook/stripe',
    '/api/uploadthing'
]);

// Define admin routes
const isAdminRoute = createRouteMatcher([
    '/events/create',
]);

export default clerkMiddleware(async (auth, req) => {
    const userId = auth().userId;

    // Check if the request is for a public route
    if (isPublicRoute(req)) {
        return NextResponse.next();
    }

    if (!userId) {
        return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    try {
        const user = await clerkClient().users.getUser(userId);

        const isAdmin = user && user.publicMetadata?.role === 'admin';

        if (isAdminRoute(req)) {
            if (isAdmin) {
                return NextResponse.next();
            } else {
                return NextResponse.redirect(new URL('/', req.url));
            }
        }
    } catch (error) {
        return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};
