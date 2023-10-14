import { Session } from 'lucia';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'UHEARD',
	description: 'Share your favorite Spotify Tracks!',
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
				className={(inter.className, 'min-w-screen flex min-h-screen flex-col')}
			>
				<Header />
				{children}
			</body>
		</html>
	);
}
