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
		openGraph: {
			images: session.user.picture,
		},
	};
};

const Profile = async ({}: ProfileProps) => {
	const session = await getSession();

	if (!session) redirect('/');

	return (
		<main className='flex flex-col items-center flex-1 w-full p-4 text-center'>
			{session && (
				<div className='flex gap-3 pb-1'>
					<img
						height={300}
						width={300}
						src={session.user.picture}
						alt={`${session.user.name}'s profile picture`}
						className='w-5/12 h-auto max-h-40 rounded-sm md:w-auto  md:max-h-52'
					/>
					<div className='flex flex-col items-start flex-1 gap-1 m-auto '>
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
			<UserRecommendationFeed id={session.user.id} />
		</main>
	);
};

export default Profile;
