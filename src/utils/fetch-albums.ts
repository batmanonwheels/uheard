import { getSession } from '@/utils/get-session';
import { SpotifyAlbumsResponse } from '@/types/spotify';
import { redirect } from 'next/navigation';
import { Session } from 'lucia';
import { refreshAccessToken } from './refresh-access-token';
import { checkAccessToken } from './check-access-token';

export const fetchAlbums = async (limit = 10) => {
	const isTokenExpired = await checkAccessToken();
	if (isTokenExpired) await refreshAccessToken();

	const session: Session | null = await getSession();
	if (!session) redirect('/login');

	const baseUrl = 'https://api.spotify.com/v1/';

	try {
		const url = new URL(baseUrl + 'me/albums?');
		url.searchParams.set('limit', limit.toString());

		const { items: albums, error }: SpotifyAlbumsResponse = await fetch(url, {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + session.user.accessToken,
			},
			cache: 'no-store',
		}).then((res) => res.json());

		if (error) throw new Error(error.message);

		return albums;
	} catch (error: any) {
		return error;
	}
};
