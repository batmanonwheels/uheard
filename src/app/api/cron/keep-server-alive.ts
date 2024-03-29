import { NextRequest, NextResponse } from 'next/server';
import { fetchTrackRecommendations } from '@/utils/fetch-track-recommendations';

export const GET = async (req: NextRequest, res: NextResponse) => {
	try {
		const recommendations = await fetchTrackRecommendations();
		return NextResponse.json({ recommendations, ok: true });
	} catch (error: any) {
		return new NextResponse(error.message, { status: error.status });
	}
};
