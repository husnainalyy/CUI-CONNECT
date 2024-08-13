import {ClerkProvider} from '@clerk/nextjs'
import './globals.css'

import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
                <body
                    className={cn(
                        "min-h-screen w-full bg-background font-sans antialiased",
                        fontSans.variable
                    )}
                >
                    {children}
                </body>
            </html>
        </ClerkProvider>
    )
}