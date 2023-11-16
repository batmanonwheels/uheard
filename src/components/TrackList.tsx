import { SpotifyTracks } from '@/types/spotify';
import { redirect } from 'next/navigation';
import { fetchTracks } from '@/utils/fetch-tracks';
import LoadTracksButton from './LoadTracksButton';
import { getSession } from '@/utils/get-session';
import TrackCardSquare from './TrackCardSquare';

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
			<ul className='flex flex-col w-full justify-center sm:flex-wrap sm:flex-row md:w-10/12'>
				{tracks &&
					tracks.map((track: SpotifyTracks, t: number) => (
						<TrackCardSquare track={track.track} key={t} />
					))}
			</ul>
			{tracks && <LoadTracksButton limit={limit} type={type} />}
		</>
	);
};

export default TrackList;
