import { SpotifyAlbum } from '@/types/spotify';
import SearchBar from './SearchBar';
import LoadTracksButton from './LoadTracksButton';
import { fetchAlbumSearchResults } from '@/utils/fetch-album-search-results';
import AlbumCardSquare from './AlbumCardSquare';

interface AlbumListSearchProps {
	searchParams: {
		t: string;
		l: string;
		q: string;
	};
}

const AlbumListSearch = async ({ searchParams }: AlbumListSearchProps) => {
	const limit = parseInt(searchParams.l);
	const { t: type, q: query } = searchParams;

	const albums: SpotifyAlbum[] | null = await fetchAlbumSearchResults(
		limit,
		query
	);

	return (
		<>
			<SearchBar searchParams={searchParams} type='albums' />
			<section className='flex flex-col w-full pt-3 justify-center items-center'>
				{albums && query && (
					<>
						<p className='sticky z-0 p-1 text-sm w-full bg-black top-20 text-zinc-400 sm:text-base md:top-12 md:p-2'>
							Showing results for <span className='italic'>{query}</span>
						</p>
						<ul className='flex flex-col w-full justify-center sm:flex-wrap sm:flex-row md:w-10/12'>
							{albums.map((album: SpotifyAlbum, t: number) => (
								<AlbumCardSquare album={album} key={t} />
							))}
						</ul>
						<LoadTracksButton limit={limit} type={type} query={query} />
					</>
				)}
			</section>
		</>
	);
};

export default AlbumListSearch;
