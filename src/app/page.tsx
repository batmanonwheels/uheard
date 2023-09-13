import Link from 'next/link';
import { auth } from '@/lib/lucia';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Form from '@/components/Form';

const Home = async () => {
	const authRequest = auth.handleRequest({
		request: null,
		cookies,
	});

	const session = await authRequest.validate();

	return (
		<main className='flex min-h-screen flex-col items-center text-center p-24'>
			{!session && <Link href='/login'>Login</Link>}
			{session && (
				<>
					<h1>Welcome, {session.user.name.split(' ')[0]}!</h1>
					<Link href={session.user.spotifyUri}>
						<p>View your Spotify Profile</p>
					</Link>
					<Link href={'/tracks'}>
						<p>View your recently played tracks!</p>
					</Link>
					<Form action='/api/logout'>
						<input type='submit' value='Sign out' />
					</Form>
				</>
			)}
		</main>
	);
};

export default Home;
