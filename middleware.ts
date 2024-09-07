import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const isAuthenticated = checkAuth(request) // implement this function based on your auth strategy

    if (!isAuthenticated) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/dashboard/:path*',
}

function checkAuth(request: NextRequest): boolean {
    // Implement your authentication logic here
    return true; // Replace with your actual authentication check
}
