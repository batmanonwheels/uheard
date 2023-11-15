import { auth, spotifyAuth } from '@/lib/lucia';
import { prisma } from '@/lib/prisma';
import { OAuthRequestError } from '@lucia-auth/oauth';
import { cookies } from 'next/headers';

import type { NextRequest } from 'next/server';

export const GET = async (request: NextRequest) => {
	const cookieStore = cookies();
	const storedState = cookieStore.get('spotify_oauth_state')?.value;
	const url = new URL(request.url);
	const state = url.searchParams.get('state');
	const code = url.searchParams.get('code');

	// validate state
	if (!storedState || !state || storedState !== state || !code) {
		return new Response(null, {
			status: 400,
		});
	}

	try {
		const { getExistingUser, spotifyUser, createUser, spotifyTokens } =
			await spotifyAuth.validateCallback(code);

		const getUser = async () => {
			const existingUser = await prisma.user.findUnique({
				where: {
					id: spotifyUser.id,
				},
			});

			//get timestamp for 1 hour from now to coincide with spotify access token exipration time
			const currentTime = new Date();
			const hourFromNow = new Date(
				currentTime.setHours(currentTime.getHours() + 1)
			);

			if (existingUser) {
				// update accessToken and profile picture on sign in
				const updatedUser = await prisma.user.update({
					where: {
						id: spotifyUser.id,
					},
					data: {
						picture:
							spotifyUser.images.length > 0
								? spotifyUser.images[spotifyUser.images.length - 1].url
								: 'https://www.nicepng.com/png/full/933-9332131_profile-picture-default-png.png',
						accessToken: spotifyTokens.accessToken,
						tokenExpiresIn: spotifyTokens.accessTokenExpiresIn,
						tokenExpiresAt: hourFromNow,
						refreshToken: spotifyTokens.refreshToken,
					},
				});
				return updatedUser;
			}

			const user = await prisma.user.create({
				data: {
					id: spotifyUser.id,
					name: spotifyUser.display_name!,
					email: spotifyUser.email!,
					picture:
						spotifyUser.images.length > 0
							? spotifyUser.images[spotifyUser.images.length - 1].url
							: 'https://www.nicepng.com/png/full/933-9332131_profile-picture-default-png.png',
					spotifyProfileLink: spotifyUser.href,
					spotifyUri: spotifyUser.uri,
					accessToken: spotifyTokens.accessToken,
					tokenExpiresIn: spotifyTokens.accessTokenExpiresIn,
					tokenExpiresAt: hourFromNow,
					refreshToken: spotifyTokens.refreshToken,
				},
			});

			return user;
		};

		const user = await getUser();

		const session = await auth.createSession({
			userId: user.id,
			attributes: {},
		});

		const authRequest = auth.handleRequest({ request, cookies });

		authRequest.setSession(session);

		return new Response(null, {
			status: 302,
			headers: {
				Location: '/', // redirect to profile page
			},
		});
	} catch (e) {
		console.log(e);
		if (e instanceof OAuthRequestError) {
			// invalid code
			return new Response(null, {
				status: 400,
			});
		}
		return new Response(null, {
			status: 500,
		});
	}
};
