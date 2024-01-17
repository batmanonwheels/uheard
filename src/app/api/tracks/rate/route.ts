import { getServerSession } from '@/utils/get-server-session';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { convertStarsToNumber } from '@/utils/convert-stars';

export const PATCH = async (req: NextRequest, res: NextResponse) => {
	try {
		const { id, rating } = await req.json();
		if (!id || !rating) throw new Error('An error has occured');

		const intId = parseInt(id);

		const session = await getServerSession(req);
		if (!session) throw new Error('User is not signed in ');

		const intRating = await convertStarsToNumber(rating.split(''));
		if (!intRating) throw new Error('An error has occured');

		const updatedRecommendation = await prisma.trackRecommendation.update({
			where: { id: intId, userId: session.user.id.toString() },
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
