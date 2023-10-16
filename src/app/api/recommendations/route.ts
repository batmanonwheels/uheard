import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from '@/utils/get-server-session';
import { removeTrackFromPlaylist } from '@/utils/remove-track-from-playlist';

export const DELETE = async (req: NextRequest, res: NextResponse) => {
	const id = req.nextUrl.searchParams.get('recommendation');

	if (!id) throw new Error('An error has occured :(');

	const session = await getServerSession(req);
	if (!session) throw new Error('User is not signed in ');

	try {
		const recommendation = await prisma.recommendation.delete({
			where: { id: parseInt(id) },
		});

		if (!recommendation) throw new Error('Recommendation does not exist.');

		// await removeTrackFromPlaylist(recommendation.trackUrl);

		return NextResponse.json({ recommendation, ok: true });
	} catch (error: any) {
		return new NextResponse(error.message, { status: error.status });
	}
};
