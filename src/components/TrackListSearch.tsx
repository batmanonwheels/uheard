import { SpotifyTrack } from '@/types/spotify';
import TrackCard from './TrackCard';
import SearchBar from './SearchBar';
import LoadTracksButton from './LoadTracksButton';
import { fetchSearchResults } from '@/utils/fetch-search-results';
import TrackCardSquare from './TrackCardSquare';

interface TrackListSearchProps {
	searchParams: {
		t: string;
		l: string;
		q: string;
	};
}

const TrackListSearch = async ({ searchParams }: TrackListSearchProps) => {
	const limit = parseInt(searchParams.l);
	const { t: type, q: query } = searchParams;

	const tracks: SpotifyTrack[] | null = await fetchSearchResults(limit, query);

	return (
		<>
			<SearchBar searchParams={searchParams} />
			<section className='flex flex-col w-full pt-3 justify-center items-center'>
				{tracks && query && (
					<>
						<p className='sticky z-0 p-1 text-sm w-full bg-black top-20 text-zinc-400 sm:text-base md:top-12 md:p-2'>
							Showing results for <span className='italic'>{query}</span>
						</p>
						<ul className='flex flex-col w-full justify-center sm:flex-wrap sm:flex-row md:w-10/12'>
							{tracks.map((track: SpotifyTrack, t: number) => (
								<TrackCardSquare track={track} key={t} />
							))}
						</ul>
						<LoadTracksButton limit={limit} type={type} query={query} />
					</>
				)}
			</section>
		</>
	);
};

export default TrackListSearch;
