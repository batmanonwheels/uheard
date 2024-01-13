import { getSession } from '@/utils/get-session';
import { SpotifyTrackSearchResponse } from '@/types/spotify';
import { redirect } from 'next/navigation';
import { Session } from 'lucia';
import { checkAccessToken } from './check-access-token';
import { refreshAccessToken } from './refresh-access-token';

export const fetchTrackSearchResults = async (limit = 10, query: string) => {
	const isTokenExpired = await checkAccessToken();
	if (isTokenExpired) await refreshAccessToken();

	const session: Session | null = await getSession();
	if (!session) redirect('/login');

	const baseUrl = 'https://api.spotify.com/v1/';

	if (query) {
		const url = new URL(baseUrl + 'search?');
		url.searchParams.set('q', query);
		url.searchParams.set('type', 'track');
		url.searchParams.set('limit', limit.toString());

		try {
			const { tracks: results, error }: SpotifyTrackSearchResponse =
				await fetch(url, {
					method: 'GET',
					headers: {
						Authorization: 'Bearer ' + session.user.accessToken,
					},
					cache: 'no-store',
				}).then((res) => res.json());

			if (error) {
				throw new Error(error.message);
			}

			return results.items;
		} catch (error: any) {
			return error;
		}
	}
};
