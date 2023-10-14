import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	if (!request.cookies.get('spotify_oauth_state')) {
		console.log('hi');
		return NextResponse.redirect(new URL('/api/login/spotify', request.url));
	}
}

export const config = {
	matcher: ['/tracks', '/tracks/recommend/:path*'],
};
