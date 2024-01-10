import { Session } from 'lucia';
import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
	themeColor: '#22C55E ',
};

export const metadata: Metadata = {
	title: 'UHEARD',
	appleWebApp: {
		capable: true,
		title: 'UHEARD',
		statusBarStyle: 'black-translucent',
		startupImage:
			'https://utfs.io/f/53a19ca9-1130-4f99-9e27-95e3c2f8ca0c-hru0oc.png',
	},
	icons: 'https://utfs.io/f/53a19ca9-1130-4f99-9e27-95e3c2f8ca0c-hru0oc.png',
	description: 'Share your favorite songs with the world!',
	openGraph: {
		title: 'UHEARD',
		description: 'Share your favorite songs with the world!',
		images:
			'https://res.cloudinary.com/dmmn0gqaf/image/upload/v1700528168/Screenshot_2023-11-20_at_7.54.06_PM_olcdnb.webp',
	},
	twitter: {
		title: 'UHEARD',
		description: 'Share your favorite songs with the world!',
		images:
			'https://res.cloudinary.com/dmmn0gqaf/image/upload/v1700528168/Screenshot_2023-11-20_at_7.54.06_PM_olcdnb.webp',
	},
};

export default function RootLayout({
	children,
	session,
}: {
	children: React.ReactNode;
	session: Session;
}) {
	return (
		<html lang='en'>
			<body
				className={
					(inter.className,
					' min-w-screen flex min-h-screen flex-col overflow-auto ')
				}
			>
				<Header />
				{children}
			</body>
		</html>
	);
}
