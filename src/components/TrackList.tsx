import { SpotifyTracks } from '@/types/spotify';
import TrackCard from './TrackCard';
import { redirect } from 'next/navigation';
import { fetchTracks } from '@/utils/fetch-tracks';
import LoadTracksButton from './LoadTracksButton';
import { getSession } from '@/utils/get-session';

interface TrackListProps {
	searchParams: {
		t: string;
		l: string;
	};
}

const TrackList = async ({ searchParams }: TrackListProps) => {
	const session = await getSession();
	if (!session) redirect('/');

	const limit = parseInt(searchParams.l);
	const type = searchParams.t;

	const tracks: SpotifyTracks[] | undefined = await fetchTracks(limit, type);

	return (
		<>
			{/* <div className='sticky z-10 flex flex-col w-full pt-2 bg-black top-12'>
				<h2 className='text-sm text-left text-green-500 font-vcr'>
					{`${type === 'recent' ? 'RECENT TRACKS' : 'LIKED TRACKS'}`}
				</h2>
				<hr className='w-full mx-auto mt-2 border-green-500' />
			</div> */}
			<ul className='flex flex-col items-center w-full rounded-lg gap-1 md:flex-row md:flex-wrap md:justify-center md:gap-6'>
				{tracks &&
					tracks.map((track: SpotifyTracks, t: number) => (
						<li
							className={`flex w-full flex-row gap-3 rounded-md p-2 text-left max-w-full md:max-h-44 md:w-5/12`}
							key={t}
						>
							<TrackCard track={track.track} current={false} />
						</li>
					))}
			</ul>
			{tracks && <LoadTracksButton limit={limit} type={type} />}
		</>
	);
};

export default TrackList;
