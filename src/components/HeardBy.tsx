import { UserPersonalData } from '@/types/prisma';
import Link from 'next/link';

interface HeardByProps {
	user: UserPersonalData;
	feed: boolean;
}

const HeardBy = async ({ user, feed }: HeardByProps) => {
	if (feed)
		return (
			<div className=' flex gap-1 rounded-md'>
				<h2 className='text-xs text-left text-green-500 font-vcr text-opacity-75'>
					HEARD BY
				</h2>
				<img
					src={user.picture || undefined}
					alt={`${user.name}'s profile picture`}
					className='w-auto h-4 rounded-sm aspect-square object-cover'
				/>
				<p className='text-xs text-green-400 font-vcr text-opacity-75'>
					{user.name.toUpperCase()}{' '}
				</p>
			</div>
		);

	return (
		<div className='z-10 flex w-full gap-1 lg:absolute lg:top-0 lg:w-full lg:p-4'>
			<h2 className='text-sm text-left text-green-500 font-vcr'>HEARD BY</h2>
			<Link
				href={'/u/' + user.username}
				className='flex items-center gap-1 justify-evenly'
			>
				<img
					src={user.picture || undefined}
					alt={`${user.name}'s profile picture`}
					className='w-auto h-4 rounded-sm '
				/>
				<p className='text-sm text-green-400 font-vcr'>
					{user.name.toUpperCase()}{' '}
				</p>
			</Link>
		</div>
	);
};

export default HeardBy;
