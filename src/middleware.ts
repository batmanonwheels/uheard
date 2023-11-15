import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	//intended URL before middleware interruption
	// const targetURL: string =
	// 	process.env.NODE_ENV === 'production'
	// 		? request.url.split('https://uheard.vercel.app')[1]
	// 		: request.url.split('http://localhost:3000')[1];
	// if (!request.cookies.get('spotify_oauth_state')) {
	// 	return NextResponse.redirect(
	// 		new URL('/api/refresh?target=' + targetURL, request.url)
	// 	);
	// }
}

// export const config = {
// 	// matcher: ['/tracks', '/tracks/recommend/:path*'],
// };
