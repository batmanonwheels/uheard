import { getSession } from './get-session';

export const fetchRecommendationDetails = async (id: string) => {
	const session = await getSession();

	if (!session) return null;
	try {
		const { tracks: related, ok } = await fetch(
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
				next: { revalidate: 3600 },
			}
		).then((res) => res.json());

		if (!ok) return [];
		return { related };
	} catch (error: any) {
		return error;
	}
};
