import { auth, spotifyAuth } from '@/lib/lucia';
import { refreshAccessToken } from '@/utils/refresh-access-token';
import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';

export const GET = async (request: NextRequest) => {
	const [url, state] = await spotifyAuth.getAuthorizationUrl();
	refreshAccessToken();

	const target: string = request.nextUrl.searchParams.get('target')
		? request.nextUrl.searchParams.get('target')!
		: '/';

	const cookieStore = cookies();
	//store state
	cookieStore.set('spotify_oauth_state', state, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		path: '/',
		maxAge: 60 * 60,
	});

	return NextResponse.redirect(new URL(target, request.url));
};
