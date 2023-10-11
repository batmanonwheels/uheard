import { getSession } from '@/utils/get-session';
import { SpotifySearchResponse } from '@/types/spotify';
import { redirect } from 'next/navigation';
import { Session } from 'lucia';

export const fetchSearchResults = async (limit = 10, query: string) => {
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
