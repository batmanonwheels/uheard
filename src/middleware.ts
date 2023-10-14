import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	if (!request.cookies.get('spotify_oauth_state'))
		return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
	matcher: ['/tracks', '/tracks/recommend/:path*'],
};
