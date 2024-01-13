import AlbumList from '@/components/AlbumList';
import AlbumListSearch from '@/components/AlbumListSearch';
import CurrentTrack from '@/components/CurrentTrack';
import { getSession } from '@/utils/get-session';
import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

interface AlbumsProps {
	searchParams: {
		t: string;
		l: string;
		q: string;
	};
}

export const generateMetadata = async ({
	searchParams,
}: AlbumsProps): Promise<Metadata> => {
	const session = await getSession();
	const { t: type } = searchParams;

	if (!session) return { title: 'Your Spotify Albums | UHEARD' };

	switch (type) {
		case 'search':
			return {
				title: `Search | UHEARD`,
			};
		case 'liked':
			return {
				title: `${session.user.name.split(' ')[0]}'s Liked Albums | UHEARD`,
			};
		default:
			return {
				title: `${session.user.name.split(' ')[0]}'s Recent Albums | UHEARD`,
			};
	}
};

const Albums = async ({ searchParams }: AlbumsProps) => {
	const session = await getSession();
	if (!session) redirect('/');

	const limit = parseInt(searchParams.l);
	const type = searchParams.t;

	const categories: string[] = ['liked'];

	return (
		<main className='relative flex flex-col items-center flex-1 w-full p-4 pt-3 text-center '>
			<CurrentTrack id={session.user.id} type='album' />
			<AlbumListSearch searchParams={searchParams} />
			{!searchParams.q && (
				<>
					<div className='flex flex-row w-full py-1  bg-black justify-evenly md:pt-0 md:sticky md:z-20 md:top-3 md:w-1/3 md:bg-transparent'>
						{categories.map((category, i) => (
							<div key={i}>
								<Link
									href={`/albums?t=${category}&l=${limit}&q=`}
									scroll={false}
									className={`text-left text-sm  font-vcr z-20 ${
										type === `${category}` ? 'text-green-500' : 'text-zinc-400 '
									}`}
									key={i}
								>
									{category.toUpperCase()}
								</Link>
								{type === `${category}` && (
									<hr className='w-full mt-1 border-green-500 rounded-xl' />
								)}
							</div>
						))}
					</div>
					<AlbumList searchParams={searchParams} />
				</>
			)}
		</main>
	);
};

export default Albums;
