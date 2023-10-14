import { SpotifyTrackResponse } from '@/types/spotify';
import { getSession } from './get-session';

export const addTrackToPlaylist = async (uri: string) => {
	const session = await getSession();

	if (!session) return null;
	try {
		const playlist: SpotifyTrackResponse = await fetch(
			`https://api.spotify.com/v1/playlists/3auOOQzjcpQzwg39bxxw4u/tracks?` +
				new URLSearchParams({
					uris: uri,
					position: '0',
				}),
			{
				method: 'POST',
				headers: {
					Authorization: 'Bearer ' + session.user.accessToken,
				},
				cache: 'no-store',
			}
		).then((res) => res.json());
		console.log(playlist);

		if (playlist.error) throw new Error(playlist.error.message);

		if (!playlist) return null;

		return playlist;
	} catch (error: any) {
		return error;
	}
};
