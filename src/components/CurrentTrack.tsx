import { SpotifyTrack } from '@/types/spotify';
import TrackCard from './TrackCard';
import { fetchCurrentTrack } from '@/utils/fetch-current-track';

interface CurrentTrackProps {}

const CurrentTrack = async ({}: CurrentTrackProps) => {
	//current track
	const track: SpotifyTrack | null | undefined = await fetchCurrentTrack();

	return (
		track && (
			<div
				className={`border flex w-full flex-row gap-3 rounded-md border-green-400 p-2 text-left mb-2 sm:max-h-40 sm:w-8/12 md:w-7/12`}
			>
				<TrackCard track={track} current={true} />
			</div>
		)
	);
};

export default CurrentTrack;
