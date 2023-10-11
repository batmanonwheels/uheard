import { SpotifyTrackResponse } from '@/types/spotify';
import { getSession } from './get-session';

export const fetchTrack = async (id: string) => {
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
				cache: 'no-store',
			}
		).then((res) => res.json());

		if (track.error) throw new Error(track.error.message);

		if (!track) return null;

		return track;
	} catch (error: any) {
		return error;
	}
};
