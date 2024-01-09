import { SpotifyTrackResponse } from '@/types/spotify';
import { getSession } from '@/utils/get-session';
import { refreshAccessToken } from '@/utils/refresh-access-token';
import { checkAccessToken } from './check-access-token';
import { prisma } from '@/lib/prisma';

export const fetchCurrentTrack = async (id: string) => {
	const isTokenExpired = await checkAccessToken(id);
	if (isTokenExpired) await refreshAccessToken(id);

	const session = await getSession();
	if (!session) return null;

	const { accessToken } = await prisma.user.findUniqueOrThrow({
		where: {
			id,
		},
		select: {
			accessToken: true,
		},
	});

	try {
		const {
			item: track,
			error,
			progress_ms,
		}: SpotifyTrackResponse = await fetch(
			`https://api.spotify.com/v1/me/player/currently-playing`,
			{
				method: 'GET',
				headers: {
					Authorization: 'Bearer ' + accessToken,
				},
				cache: 'no-store',
			}
		)
			.then((res) => (res === null ? null : res.json()))
			.catch((res) => res);

		if (error) throw new Error(error.message);

		if (!track) return null;

		track.progress_ms = progress_ms;

		track.current_time_ms = Date.now();

		track.percent_complete =
			Math.round((progress_ms / track.duration_ms) * 100) + '% ';

		return track;
	} catch (error: any) {
		return error;
	}
};
