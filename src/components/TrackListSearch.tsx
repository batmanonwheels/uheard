import { SpotifyTrack } from '@/types/spotify';
import TrackCard from './TrackCard';
import SearchBar from './SearchBar';
import LoadTracksButton from './LoadTracksButton';
import { fetchSearchResults } from '@/utils/fetch-search-results';

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
			<section className='flex flex-col flex-1 w-full gap-2 pt-3 '>
				{!tracks && (
					<p className='items-center h-full p-1 m-auto text-lg bg-black text-zinc-500 sm:text-lg'>
						Try searching for a track!
					</p>
				)}
				{tracks && query && (
					<>
						<p className='sticky z-0 p-1 text-sm bg-black top-20 text-zinc-400 sm:text-base md:top-12 md:p-2'>
							Showing results for <span className='italic'>{query}</span>
						</p>
						<ul className='flex flex-col items-center w-full gap-1 rounded-lg md:flex-row md:flex-wrap md:justify-center md:gap-6'>
							{tracks.map((track: SpotifyTrack, t: number) => (
								<li
									className={`flex w-full flex-row gap-3 rounded-md p-2 text-left max-w-full md:max-h-44 md:w-5/12`}
									key={t}
								>
									<TrackCard track={track} current={false} />
								</li>
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
