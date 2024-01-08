// app/api/logout/route.ts
import { auth } from '@/lib/lucia';
import { cookies } from 'next/headers';

import type { NextRequest } from 'next/server';

export const POST = async (request: NextRequest) => {
	const authRequest = auth.handleRequest({ request, cookies });
	// check if user is authenticated
	const session = await authRequest.validate();

	if (!session) {
		return new Response(null, {
			status: 401,
		});
	}

	const cookieStore = cookies();
	cookieStore.delete('spotify_oauth_state');

	// make sure to invalidate the current session!
	await auth.invalidateSession(session.sessionId);

	// delete session cookie
	authRequest.setSession(null);
	return new Response(null, {
		status: 302,
		headers: {
			Location: '/', // redirect to login page
		},
	});
};
