import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { SpotifyTrack } from '@/types/spotify';
import { fetchTrack } from '@/utils/fetch-track';
import { getServerSession } from '@/utils/get-server-session';
import { addTrackToPlaylist } from '@/utils/add-track-to-playlist';

export const POST = async (req: NextRequest, res: NextResponse) => {
	const trackId: string = req.nextUrl.searchParams.get('track')!;

	const session = await getServerSession(req);
	if (!session) throw new Error('User is not signed in ');

	const track: SpotifyTrack = await fetchTrack(trackId);

	if (!track) throw new Error('Track does not exist.');

	try {
		const recommendation = await prisma.recommendation.create({
			data: {
				userId: session.user.id,
				trackId: track.id,
				trackTitle: track.name,
				trackAlbum: track.album.name,
				trackArtist: track.artists.map((artist) => artist.name),
				trackImage: track.album.images[0].url,
				trackPreviewUrl: track.preview_url,
				trackUrl: track.uri,
				trackISRC: track.external_ids.isrc,
			},
		});

		// await addTrackToPlaylist(track.uri);

		return NextResponse.json({ recommendation, ok: true });
	} catch (error: any) {
		return new NextResponse(error.message, { status: error.status });
	}
};
