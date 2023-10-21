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
			{session && (
				<div className='flex justify-around gap-3 pb-2'>
					<img
						src={session.user.picture}
						alt={`${session.user.name}'s profile picture`}
						className='w-5/12 h-auto rounded-sm max-h-40 md:w-auto md:max-h-52'
					/>
					<div className='flex flex-col items-start flex-1 gap-1 m-auto h-1/2'>
						<h1 className='text-xl'>{session.user.name}</h1>
						<Link
							href={session.user.spotifyUri}
							className='py-1 text-sm text-green-500 font-vcr'
						>
							SPOTIFY PROFILE
						</Link>
						<Form action='/api/logout'>
							<input
								type='submit'
								value='SIGN OUT'
								className='text-sm text-green-600 font-vcr hover:cursor-pointer'
							/>
						</Form>
					</div>
				</div>
			)}
			<div className='sticky z-10 flex flex-col w-full pt-2 bg-black top-12'>
				<h2 className='text-sm text-left text-zinc-500 font-vcr'>
					EDIT PROFILE
					<hr className='w-full mx-auto mt-2 border-green-500' />
				</h2>
			</div>
			<UserRecommendationFeed id={session.user.id} />
		</main>
	);
};

export default Profile;
