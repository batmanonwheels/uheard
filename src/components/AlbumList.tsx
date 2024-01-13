import { SpotifyAlbums } from '@/types/spotify';

import { redirect } from 'next/navigation';
import LoadTracksButton from './LoadTracksButton';
import { getSession } from '@/utils/get-session';
import { fetchAlbums } from '@/utils/fetch-albums';
import AlbumCardSquare from './AlbumCardSquare';

interface AlbumListProps {
	searchParams: {
		t: string;
		l: string;
	};
}

const AlbumList = async ({ searchParams }: AlbumListProps) => {
	const session = await getSession();
	if (!session) redirect('/');

	const limit = parseInt(searchParams.l);
	const type = searchParams.t;

	const albums: SpotifyAlbums[] | undefined = await fetchAlbums(limit);

	return (
		<>
			<ul className='flex flex-col w-full justify-center sm:flex-wrap sm:flex-row md:w-10/12'>
				{albums &&
					albums.map((album, t: number) => (
						<AlbumCardSquare album={album.album} key={t} />
					))}
			</ul>
			{albums && <LoadTracksButton limit={limit} type={type} albums={true} />}
		</>
	);
};

export default AlbumList;
