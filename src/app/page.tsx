/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Form from '@/components/Form';
import type { Metadata } from 'next';
import { getSession } from '@/utils/get-session';
import RecommendationFeed from '@/components/RecommendationFeed';

interface HomeProps {}

export const generateMetadata = async ({}: HomeProps): Promise<Metadata> => {
	const session = await getSession();

	if (!session) return { title: 'Home - uheard' };

	return {
		title: `${session.user.name}'s Home - uheard`,
	};
};

const Home = async () => {
	const session = await getSession();

	return (
		<main className='flex flex-col items-center flex-1 w-full p-4 text-center'>
			{!session && (
				<>
					<h1 className='p-2 pb-3 text-xl'>
						Welcome to <span className='text-green-500'>UHEARD</span>!
					</h1>
					<h1 className='p-2 pb-3 text-base'>
						Connect with Spotify to show off your taste in music!
					</h1>
				</>
			)}
			{session && (
				<>
					<div className='flex justify-around gap-1 pb-2'>
						<img
							src={session.user.picture}
							alt={`${session.user.name}'s profile picture`}
							className='w-5/12 h-auto rounded-sm'
						/>
						<div className='flex flex-col items-start justify-around gap-1 m-auto text-left h-1/2'>
							<h1 className='text-xl'>
								Welcome,{' '}
								<Link href={session.user.spotifyUri}>
									{session.user.name.split(' ')[0]}
								</Link>
								!
							</h1>
							<Link
								href={'/tracks?t=recent'}
								className='text-sm text-green-500'
							>
								<p>BROWSE TRACKS</p>
							</Link>
							<Link href={'/profile'} className='text-sm text-green-500'>
								<p> VIEW PROFILE</p>
							</Link>
							<Form action='/api/logout'>
								<input
									type='submit'
									value='SIGN OUT'
									className='text-sm text-green-400'
								/>
							</Form>
						</div>
					</div>
				</>
			)}
			<RecommendationFeed />
		</main>
	);
};

export default Home;
