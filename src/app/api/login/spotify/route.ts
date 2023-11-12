// app/login/spotify/route.ts
import { auth, spotifyAuth } from '@/lib/lucia';
import { cookies } from 'next/headers';

import { NextResponse, type NextRequest } from 'next/server';

export const GET = async (request: NextRequest) => {
	const [url, state] = await spotifyAuth.getAuthorizationUrl();

	const cookieStore = cookies();
	//store state
	cookieStore.set('spotify_oauth_state', state, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		path: '/',
		maxAge: 60 * 60,
	});

	return new Response(null, {
		status: 302,
		headers: {
			Location: request.url.split('origin=')[1]
				? request.url.split('origin=')[1]
				: url.toString(),
		},
	});
};
