/* eslint-disable @next/next/no-img-element */
import { getSession } from '@/utils/get-session';
import Link from 'next/link';

interface HeaderProps {}

const Header = async ({}: HeaderProps) => {
	const session = await getSession();

	return (
		<header className={`sticky top-0 z-20 bg-black`}>
			<div className='flex items-center justify-between h-12 p-4 my-auto text-center md:text-left'>
				<Link href={`/`} className='text-xl text-green-500 font-vcr'>
					UHEARD
				</Link>
				{session && (
					<Link
						href={'/profile'}
						className='flex items-center gap-2 justify-evenly font-vcr'
					>
						<img
							src={session.user.picture}
							alt={`${session.user.name}'s profile picture`}
							className='w-auto h-8 rounded-sm '
						/>
						<p className='text-sm text-green-400'>PROFILE</p>
					</Link>
				)}
				{!session && (
					<Link
						href={'/api/login/spotify'}
						className='flex items-center gap-2 justify-evenly font-vcr'
					>
						<p className='text-sm text-green-400'>LOGIN </p>
					</Link>
				)}
			</div>
			<hr className='w-11/12 m-auto border-green-500 rounded-xl md:w-full' />
		</header>
	);
};

export default Header;
