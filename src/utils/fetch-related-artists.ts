import { checkAccessToken } from './check-access-token';
import { getSession } from './get-session';
import { refreshAccessToken } from './refresh-access-token';

export const fetchRelatedArtists = async (id: string) => {
	const isTokenExpired = await checkAccessToken();
	if (isTokenExpired) await refreshAccessToken();

	const session = await getSession();

	if (!session) return { related: [] };

	try {
		const { artists: related, error } = await fetch(
			`https://api.spotify.com/v1/artists/${id}/related-artists`,
			{
				method: 'GET',
				headers: {
					Authorization: 'Bearer ' + session.user.accessToken,
				},
				next: { revalidate: 86400 },
			}
		).then((res) => res.json());

		if (error) throw new Error(error.message);

		return { related: related.slice(0, 3) };
	} catch (error: any) {
		return error;
	}
};
