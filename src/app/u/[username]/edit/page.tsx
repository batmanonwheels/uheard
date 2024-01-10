import EditUsernameForm from '@/components/EditUsernameForm';
import EditNameForm from '@/components/EditNameForm';
import { Metadata } from 'next';
import { getSession } from '@/utils/get-session';
import { fetchUserProfile } from '@/utils/fetch-user-profile';
import { redirect } from 'next/navigation';
import Form from '@/components/Form';
import Link from 'next/link';

interface EditProfileProps {}

export const generateMetadata =
	async ({}: EditProfileProps): Promise<Metadata> => {
		const session = await getSession();

		if (!session) return { title: 'Edit Profile | UHEARD' };

		const user: UserPersonalData | null = await fetchUserProfile(
			session.user.username
		);

		return {
			title: `Edit Profile | UHEARD`,
		};
	};

const EditProfile = async ({}: EditProfileProps) => {
	const session = await getSession();
	if (!session) redirect('/');

	const user: UserPersonalData | null = await fetchUserProfile(
		session.user.username
	);
	return (
		<main className='flex flex-col items-center flex-1 w-full p-4 text-left'>
			{user && (
				<div className='flex gap-3 pb-2 w-full'>
					<img
						height={300}
						width={300}
						src={user.picture}
						alt={`${user.name}'s profile picture`}
						className=' w-auto max-h-36 rounded-sm md:max-h-52 aspect-square object-cover'
					/>
					<div className='flex flex-col items-start flex-1 gap-1 m-auto '>
						<h1 className='text-xl'>{user.name}</h1>
						<Link
							href={user.spotifyUri}
							className='py-1 text-sm text-green-500 font-vcr'
						>
							SPOTIFY PROFILE
						</Link>
						<Link
							href={'/u/' + user.username}
							className='py-1 text-sm text-green-500 font-vcr text-left'
						>
							{'RETURN TO PROFILE'}
						</Link>

						<Form action='/api/logout'>
							<input
								type='submit'
								value='LOGOUT'
								className='text-sm text-green-600 font-vcr hover:cursor-pointer'
							/>
						</Form>
					</div>
				</div>
			)}
			{user && (
				<>
					<EditNameForm currentName={user.name} />
					<EditUsernameForm currentUsername={session.user.username} />
				</>
			)}
		</main>
	);
};

export default EditProfile;
