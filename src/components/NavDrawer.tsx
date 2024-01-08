/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Form from '@/components/Form';
import { getSession } from '@/utils/get-session';
import InteractionBlocker from './InteractionBlocker';

interface NavDrawerProps {}

const NavDrawer = async ({}: NavDrawerProps) => {
	const session = await getSession();

	return (
		<div
			className='hidden max-h-0 pb-2 transition-height duration-2000 ease-in-out sm:hidden'
			id='drawer'
		>
			{session && (
				<div className='flex flex-wrap justify-between items-center z-[105]'>
					<Link
						href={'/tracks?t=recent&l=12'}
						className='py-1 text-sm w-1/2 text-green-500 font-vcr z-[105]'
					>
						<p>TRACKS</p>
					</Link>
					<div className='flex flex-row gap-2'>
						<Link
							href={'/u/' + session.user.id}
							className='flex items-center gap-2 justify-evenly font-vcr z-[105]'
						>
							<img
								src={session.user.picture}
								alt={`${session.user.name}'s profile picture`}
								className='w-auto h-6 rounded-sm'
							/>
							<p className='text-sm text-green-500 '>
								{session.user.name.toUpperCase()}
							</p>
						</Link>
						<Form action='/api/logout'>
							<input
								type='submit'
								value='LOGOUT'
								className='text-sm bg-green-500 text-black p-1 font-vcr hover:cursor-pointer w-fit rounded-sm'
							/>
						</Form>
					</div>
				</div>
			)}
			<InteractionBlocker />
		</div>
	);
};

export default NavDrawer;
