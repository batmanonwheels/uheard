import { SongLinkResponse } from '@/types/spotify';
import { getSession } from './get-session';
import { refreshAccessToken } from './refresh-access-token';
import { checkAccessToken } from './check-access-token';

export const fetchAppleMusicLink = async (uri: string) => {
	const isTokenExpired = await checkAccessToken();
	if (isTokenExpired) await refreshAccessToken();

	const session = await getSession();
	if (!session) return null;

	try {
		const links: SongLinkResponse = await fetch(
			'https://api.song.link/v1-alpha.1/links?url=' +
				encodeURIComponent(uri) +
				'&userCountry=US&platform=appleMusic',
			{
				method: 'GET',
				next: { revalidate: 86400 },
			}
		).then((res) => res.json());

		const { nativeAppUriMobile: appleMusicUri } =
			links.linksByPlatform.appleMusic;

		if (!appleMusicUri) return '';

		return appleMusicUri;
	} catch (error: any) {
		return error;
	}
};
