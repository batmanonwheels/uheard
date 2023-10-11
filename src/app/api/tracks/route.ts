import { fetchTrack } from '@/utils/fetch-track';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, res: NextResponse) => {
	const trackId: string = req.nextUrl.searchParams.get('trackId')!;
	try {
		const track = await fetchTrack(trackId);

		return NextResponse.json(track);
	} catch (error: any) {
		return new NextResponse(error.message, { status: error.status });
	}
};
