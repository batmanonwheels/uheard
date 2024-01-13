import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { SpotifyAlbum } from '@/types/spotify';
import { getServerSession } from '@/utils/get-server-session';
import { fetchAlbum } from '@/utils/fetch-album';

export const POST = async (req: NextRequest, res: NextResponse) => {
	const albumId: string = req.nextUrl.searchParams.get('album')!;
	console.log(albumId);

	const session = await getServerSession(req);
	if (!session) throw new Error('User is not signed in ');

	const album: SpotifyAlbum = await fetchAlbum(albumId);

	if (!album) throw new Error('Track does not exist.');

	try {
		const recommendation = await prisma.albumRecommendation.create({
			data: {
				userId: session.user.id,
				albumId: album.id,
				albumTitle: album.name,
				albumArtist: album.artists.map((artist) => artist.name),
				albumImage: album.images[0].url,
				albumUrl: album.uri,
			},
		});

		console.log(recommendation);

		if (!recommendation) throw new Error('An error has occured.');

		return NextResponse.json({ recommendation, ok: true });
	} catch (error: any) {
		console.log(error);
		return new NextResponse(error.message, { status: error.status });
	}
};

export const DELETE = async (req: NextRequest, res: NextResponse) => {
	const id = req.nextUrl.searchParams.get('recommendation');

	if (!id) throw new Error('An error has occured :(');

	const session = await getServerSession(req);
	if (!session) throw new Error('User is not signed in ');

	try {
		const recommendation = await prisma.albumRecommendation.delete({
			where: { id: parseInt(id) },
		});

		if (!recommendation) throw new Error('Recommendation does not exist.');

		return NextResponse.json({ recommendation, ok: true });
	} catch (error: any) {
		return new NextResponse(error.message, { status: error.status });
	}
};
