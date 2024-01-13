/* eslint-disable @next/next/no-img-element */
import { getSession } from '@/utils/get-session';
import Link from 'next/link';
import NavDrawer from './NavDrawer';
import Form from './Form';
import DrawerToggle from './DrawerToggle';
// import { headers } from 'next/headers';

interface HeaderProps {}

export const dynamic = 'force-dynamic';

const Header = async ({}: HeaderProps) => {
	const session = await getSession();

	// const path = headers().get('x-pathname');
	// console.log(path);

	return (
		<header className={`sticky top-0 z-[110] sm:z-20 bg-black px-4 sm:px-0 `}>
			<div
				className='flex items-center justify-between h-12 py-4 sm:p-4 my-auto text-center md:text-left'
				id='navbar'
			>
				<Link href={`/`} className='text-2xl text-green-500 font-vcr'>
					UHEARD
				</Link>
				{session ? (
					<>
						<div className='hidden sm:flex w-full pl-8 justify-between items-center'>
							<div className='flex gap-4'>
								<Link
									href={'/tracks?t=recent&l=12'}
									className='py-1 text-sm text-green-500 font-vcr z-[100]'
								>
									<p>TRACKS</p>
								</Link>
								<Link
									href={'/albums?t=liked&l=12'}
									className='py-1 text-sm text-green-500 font-vcr z-[100]'
								>
									<p>ALBUMS</p>
								</Link>
								{/* <Link
									href={'/tracks?t=recent&l=12'}
									className='py-1 text-sm text-green-500 font-vcr z-[100]'
								>
									<p>TRACKS</p>
									{path === `/tracks` && (
										<hr className='w-full mt-1 border-green-500 rounded-xl' />
									)}
								</Link>
								<Link
									href={'/albums?t=liked&l=12'}
									className='py-1 text-sm text-green-500 font-vcr z-[100]'
								>
									<p>ALBUMS</p>
									{path === `/albums` && (
										<hr className='w-full mt-1 border-green-500 rounded-xl' />
									)}
								</Link> */}
							</div>
							<div className='flex flex-row gap-2 items-center'>
								<Link
									href={'/u/' + session.user.username}
									className='flex items-center gap-2 justify-evenly font-vcr z-[100]'
								>
									<img
										src={session.user.picture}
										alt={`${session.user.name}'s profile picture`}
										className='w-auto h-8 rounded-sm aspect-square object-cover'
									/>
									<p className='text-sm text-green-500 '>
										{session.user.name.toUpperCase()}
									</p>
								</Link>
								<Form action='/api/logout'>
									<input
										type='submit'
										value='LOGOUT'
										className='text-sm bg-green-500 text-black p-1 font-vcr hover:cursor-pointer z-[100] rounded-sm'
									/>
								</Form>
							</div>
						</div>
						<DrawerToggle />
					</>
				) : (
					<Link
						href={'/api/login/spotify'}
						className='flex items-center gap-2 justify-evenly font-vcr'
					>
						<p className='text-sm bg-green-500 text-black py-1 px-2 rounded'>
							LOGIN{' '}
						</p>
					</Link>
				)}
			</div>
			<NavDrawer />
			<hr className='w-full m-auto border-green-500 sm:w-full' />
		</header>
	);
};

export default Header;
