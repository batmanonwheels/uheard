import { getSession } from './get-session';
import { refreshAccessToken } from './refresh-access-token';

export const fetchRelatedTracks = async (id: string) => {
	const session = await getSession();

	if (!session) return { related: [] };
	try {
		const { tracks: related, error } = await fetch(
			'https://api.spotify.com/v1/recommendations?' +
				new URLSearchParams({
					limit: '6',
					seed_tracks: id,
				}),
			{
				method: 'GET',
				headers: {
					Authorization: 'Bearer ' + session.user.accessToken,
				},
				next: { revalidate: 86400 },
			}
		).then((res) => res.json());

		if (error) {
			if (error.message === 'The access token expired') {
				const updated = await refreshAccessToken();
				if (updated) fetchRelatedTracks(id);
			} else {
				throw new Error(error.message);
			}
		}

		return { related };
	} catch (error: any) {
		return error;
	}
};
