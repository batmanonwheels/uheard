import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	if (!request.cookies.get('spotify_oauth_state')) {
		return NextResponse.redirect(new URL('/api/login/spotify'));
	}
}

export const config = {
	matcher: ['/tracks'],
};
