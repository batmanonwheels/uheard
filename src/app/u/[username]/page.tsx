/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Form from '@/components/Form';
import type { Metadata } from 'next';
import { getSession } from '@/utils/get-session';
import UserRecommendationFeed from '@/components/UserRecommendationFeed';
import { fetchUserProfile } from '@/utils/fetch-user-profile';
import { redirect } from 'next/navigation';
import EditUsernameForm from '@/components/EditUsernameForm';
import EditNameForm from '@/components/EditNameForm';
import CurrentTrack from '@/components/CurrentTrack';

interface UserPageProps {
	params: { username: string };
}

export const generateMetadata = async ({
	params,
}: UserPageProps): Promise<Metadata> => {
	const { username } = params;
	const user: UserPersonalData | null = await fetchUserProfile(username);

	if (!user) return { title: 'User Profile - UHEARD' };

	return {
		title: `${user.name}'s Profile - UHEARD`,
		openGraph: {
			images: user.picture,
		},
		twitter: {
			images: user.picture,
		},
	};
};

const UserPage = async ({ params }: UserPageProps) => {
	const { username } = params;
	const user: UserPersonalData | null = await fetchUserProfile(username);

	if (!user) redirect('/');

	const session = await getSession();
	const isUser = session && session.user.id === user.id;

	return (
		<main className='flex flex-col items-center flex-1 w-full p-4 text-center'>
			{user && (
				<div className='flex gap-3 pb-2'>
					<img
						height={300}
						width={300}
						src={user.picture}
						alt={`${user.name}'s profile picture`}
						className=' w-auto max-h-40 rounded-sm md:w-auto  md:max-h-52 aspect-square object-cover'
					/>
					<div className='flex flex-col items-start flex-1 gap-1 m-auto '>
						<h1 className='text-xl'>{user.name}</h1>
						<Link
							href={user.spotifyUri}
							className='py-1 text-sm text-green-500 font-vcr'
						>
							SPOTIFY PROFILE
						</Link>
						{isUser && (
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
			<CurrentTrack id={user.id} />
			{isUser && (
				<>
					<EditNameForm currentName={user.name} />
					<EditUsernameForm currentUsername={username} />
				</>
			)}
			<UserRecommendationFeed
				id={user.id}
				name={
					session && session.user.id === user.id
						? 'YOUR'
						: user.name.toUpperCase() + "'S"
				}
				profile={session && session.user.id === user.id ? true : false}
			/>
		</main>
	);
};

export default UserPage;
