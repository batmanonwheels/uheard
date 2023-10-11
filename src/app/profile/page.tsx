/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Form from '@/components/Form';
import type { Metadata } from 'next';
import { getSession } from '@/utils/get-session';
import UserRecommendationFeed from '@/components/UserRecommendationFeed';
import { redirect } from 'next/navigation';

interface ProfileProps {}

export const generateMetadata = async ({}: ProfileProps): Promise<Metadata> => {
	const session = await getSession();
	if (!session) return { title: 'Profile - uheard' };

	return {
		title: `${session.user.name}'s Profile - uheard`,
	};
};

const Profile = async ({}: ProfileProps) => {
	const session = await getSession();

	if (!session) redirect('/');

	return (
		<main className='flex flex-col items-center flex-1 w-full p-4 text-center'>
			{!session && (
				<Link href='/login' className='m-auto'>
					Login
				</Link>
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
							<h1 className='text-xl'>{session.user.name}</h1>
							{/* <p className='text-sm '>JOINED IN 2023</p> */}
							<Link
								href={session.user.spotifyUri}
								className='text-sm text-green-500'
							>
								VIEW SPOTIFY PROFILE
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
			<UserRecommendationFeed id={session.user.id} />
		</main>
	);
};

export default Profile;
