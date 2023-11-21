import { fetchAppleMusicLink } from '@/utils/fetch-apple-music-link';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, res: NextResponse) => {
	const uri: string = req.nextUrl.searchParams.get('uri')!;
	try {
		const link = await fetchAppleMusicLink(uri);

		return NextResponse.redirect(link);
	} catch (error: any) {
		return new NextResponse(error.message, { status: error.status });
	}
};
