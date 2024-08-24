import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import type { Metadata } from 'next';

import { Roboto } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/shared/theme-provider';

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['300', '400', '700'],
});

export const metadata: Metadata = {
    title: 'CUI CONNECT',
    description: 'CUI CONNECT is a platform for event management.',
    icons: {
        icon: '/favicon.ico', // Ensure this path is correct
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
                <body
                    className={cn(
                        'min-h-screen w-full bg-background antialiased',
                        roboto.className
                    )}
                >
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}