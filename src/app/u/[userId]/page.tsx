/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Form from '@/components/Form';
import type { Metadata } from 'next';
import { getSession } from '@/utils/get-session';
import UserRecommendationFeed from '@/components/UserRecommendationFeed';
import { fetchUserProfile } from '@/utils/fetch-user-profile';

interface UserPageProps {
	params: { userId: string };
}

export const generateMetadata = async ({
	params,
}: UserPageProps): Promise<Metadata> => {
	const { userId } = params;
	const user = await fetchUserProfile(userId);
	if (!user || !user.name || !user.picture)
		return { title: 'User Profile - UHEARD' };

	return {
		title: `${user.name}'s Profile - UHEARD`,
		openGraph: {
			images: user.picture,
		},
	};
};

const UserPage = async ({ params }: UserPageProps) => {
	const { userId } = params;
	const user = await fetchUserProfile(userId);

	const session = await getSession();

	return (
		<main className='flex flex-col items-center flex-1 w-full p-4 text-center'>
			{user && (
				<div className='flex gap-3 pb-1'>
					<img
						height={300}
						width={300}
						src={user.picture}
						alt={`${user.name}'s profile picture`}
						className='w-5/12 h-auto max-h-40 rounded-sm md:w-auto  md:max-h-52'
					/>
					<div className='flex flex-col items-start flex-1 gap-1 m-auto '>
						<h1 className='text-xl'>{user.name}</h1>
						<Link
							href={user.spotifyUri}
							className='py-1 text-sm text-green-500 font-vcr'
						>
							SPOTIFY PROFILE
						</Link>
						{session && session.user.id === userId && (
							<Form action='/api/logout'>
								<input
									type='submit'
									value='LOGOUT'
									className='text-sm text-green-600 font-vcr hover:cursor-pointer'
								/>
							</Form>
						)}
					</div>
				</div>
			)}
			<UserRecommendationFeed
				id={userId}
				name={
					session && session.user.id === userId
						? 'YOUR'
						: user.name.toUpperCase() + "'S"
				}
				profile={session && session.user.id === userId ? true : false}
			/>
		</main>
	);
};

export default UserPage;
