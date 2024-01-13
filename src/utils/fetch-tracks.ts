import { getSession } from '@/utils/get-session';

import { SpotifyTracksResponse } from '@/types/spotify';
import { redirect } from 'next/navigation';
import { Session } from 'lucia';
import { refreshAccessToken } from './refresh-access-token';
import { checkAccessToken } from './check-access-token';

type FetchUrls = {
	recent: string;
	liked: string;
};

export const fetchTracks = async (limit = 10, type: string, query?: string) => {
	const isTokenExpired = await checkAccessToken();
	if (isTokenExpired) await refreshAccessToken();

	const session: Session | null = await getSession();
	if (!session) redirect('/login');

	const baseUrl = 'https://api.spotify.com/v1/';

	try {
		const trackFetchUrls: FetchUrls = {
			recent: baseUrl + `me/player/recently-played?limit=${limit + ''}`,
			liked: baseUrl + `me/tracks?limit=${limit + ''}`,
		};

		const { items: tracks, error }: SpotifyTracksResponse = await fetch(
			trackFetchUrls[type as keyof FetchUrls],
			{
				method: 'GET',
				headers: {
					Authorization: 'Bearer ' + session.user.accessToken,
				},
				cache: 'no-store',
			}
		).then((res) => res.json());

		if (error) throw new Error(error.message);

		return tracks;
	} catch (error: any) {
		return error;
	}
};
