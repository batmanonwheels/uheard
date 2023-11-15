import { getSession } from '@/utils/get-session';
import { SpotifySearchResponse } from '@/types/spotify';
import { redirect } from 'next/navigation';
import { Session } from 'lucia';
import { checkAccessToken } from './check-access-token';
import { refreshAccessToken } from './refresh-access-token';

export const fetchSearchResults = async (limit = 10, query: string) => {
	const isTokenExpired = await checkAccessToken();
	if (isTokenExpired) await refreshAccessToken();

	const session: Session | null = await getSession();
	if (!session) redirect('/login');

	const baseUrl = 'https://api.spotify.com/v1/';

	if (query) {
		try {
			const { tracks: results, error }: SpotifySearchResponse = await fetch(
				baseUrl +
					`search?` +
					new URLSearchParams({
						q: query,
						type: 'track',
						limit: limit.toString(),
					}),
				{
					method: 'GET',
					headers: {
						Authorization: 'Bearer ' + session.user.accessToken,
					},
					cache: 'no-store',
				}
			).then((res) => res.json());

			if (error) {
				throw new Error(error.message);
			}

			return results.items;
		} catch (error: any) {
			return error;
		}
	}
};
