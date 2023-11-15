import { SpotifyTrackResponse } from '@/types/spotify';
import { getSession } from './get-session';
import { refreshAccessToken } from './refresh-access-token';
import { checkAccessToken } from './check-access-token';

export const fetchTrack = async (id: string) => {
	const isTokenExpired = await checkAccessToken();
	if (isTokenExpired) await refreshAccessToken();

	const session = await getSession();
	if (!session) return null;

	try {
		const track: SpotifyTrackResponse = await fetch(
			`https://api.spotify.com/v1/tracks/${id}`,
			{
				method: 'GET',
				headers: {
					Authorization: 'Bearer ' + session.user.accessToken,
				},
				next: { revalidate: 86400 },
			}
		).then((res) => res.json());

		if (track.error) throw new Error(track.error.message);

		return track;
	} catch (error: any) {
		return error;
	}
};
