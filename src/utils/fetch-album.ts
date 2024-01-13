import { SpotifyAlbum } from '@/types/spotify';
import { getSession } from './get-session';
import { refreshAccessToken } from './refresh-access-token';
import { checkAccessToken } from './check-access-token';

export const fetchAlbum = async (id: string) => {
	const isTokenExpired = await checkAccessToken();
	if (isTokenExpired) await refreshAccessToken();

	const session = await getSession();
	if (!session) return null;

	try {
		const album: SpotifyAlbum = await fetch(
			`https://api.spotify.com/v1/albums/${id}`,
			{
				method: 'GET',
				headers: {
					Authorization: 'Bearer ' + session.user.accessToken,
				},
				next: { revalidate: 86400 },
			}
		).then((res) => res.json());

		if (album.error) throw new Error(album.error.message);

		return album;
	} catch (error: any) {
		return error;
	}
};
