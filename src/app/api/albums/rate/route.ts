import { prisma } from '@/lib/prisma';
import { convertStarsToNumber } from '@/utils/convert-stars';
import { getServerSession } from '@/utils/get-server-session';
import { NextRequest, NextResponse } from 'next/server';

export const PATCH = async (req: NextRequest, res: NextResponse) => {
	try {
		const { id, rating } = await req.json();
		if (!id || !rating) throw new Error('An error has occured');

		const intId = parseInt(id);

		const session = await getServerSession(req);
		if (!session) throw new Error('User is not signed in');

		const intRating = await convertStarsToNumber(rating.split(''));
		if (!intRating) throw new Error('An error has occured');

		const updatedRecommendation = await prisma.albumRecommendation.update({
			where: { id: intId, userId: session.user.id },
			data: {
				rating: intRating,
			},
		});

		if (!updatedRecommendation)
			throw new Error('Recommendation does not exist.');

		return NextResponse.json({ ok: true }, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({}, { status: 400, statusText: error.message });
	}
};
