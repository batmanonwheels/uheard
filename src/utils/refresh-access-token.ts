import { prisma } from '@/lib/prisma';
import { getSession } from './get-session';

export const refreshAccessToken = async () => {
	const session = await getSession();

	if (!session) return null;

	const user = await prisma.user.findUnique({
		where: {
			id: session.user.id,
		},
	});

	if (!user) return null;

	const clientBTOA = btoa(
		process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
	);

	const { access_token: newAccessToken } = await fetch(
		'https://accounts.spotify.com/api/token',
		{
			method: 'POST',
			headers: {
				Authorization: `Basic ` + clientBTOA,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams({
				grant_type: 'refresh_token',
				refresh_token: user?.refreshToken,
			}),
			cache: 'no-store',
		}
	).then((res) => res.json());

	if (!newAccessToken) return false;

	const accessToken = await prisma.user.update({
		where: {
			id: user.id,
		},
		data: {
			accessToken: newAccessToken,
		},
	});

	if (!accessToken) return false;

	return !!accessToken;
};
