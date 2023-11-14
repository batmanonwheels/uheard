import { SpotifyArtist, SpotifyTrack } from '@/types/spotify';
import RecommendLink from './RecommendLink';
import Image from 'next/image';
import TrackProgressBar from './TrackProgressBar';

interface TrackCardProps {
	track: SpotifyTrack;
	current: boolean;
}

const TrackCard = ({ track, current }: TrackCardProps) => {
	return (
		<>
			<Image
				height={track.album.images[0].height}
				width={track.album.images[0].width}
				src={track.album.images[0].url}
				alt={`${track.name} cover art`}
				className={`my-auto h-full max-h-32 w-3/12 items-center rounded-md  ${
					current ? 'md:max-h-36 lg:max-h-52' : 'md:max-h-32 lg:max-h-52'
				}  sm:w-auto sm:h-full `}
				priority={!!current}
			/>
			<div className='flex flex-col flex-1 w-3/6 my-auto '>
				{current && (
					<>
						<h2 className='py-1 text-xs text-green-400 text-opacity-75 font-vcr'>
							{'CURRENTLY PLAYING'}
						</h2>
						<TrackProgressBar
							percentComplete={track.percent_complete}
							key={track.percent_complete}
						/>
					</>
				)}
				<h3 className='text-zinc-100'>{track.name}</h3>
				<p className='text-sm text-zinc-300 '>
					{track.artists.map((artist: SpotifyArtist) => artist.name).join(', ')}
				</p>
				{track.album.total_tracks > 1 && (
					<p className='text-xs text-zinc-400'>{track.album.name}</p>
				)}
			</div>
			<RecommendLink trackId={track.id} />
		</>
	);
};

export default TrackCard;
