import { SpotifyArtist, SpotifyTrack } from '@/types/spotify';
import RecommendLink from './RecommendLink';
import Image from 'next/image';
import Link from 'next/link';
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
				className={`my-auto h-full max-h-32 w-3/12  items-center rounded-md  ${
					current ? 'md:max-h-36' : 'md:max-h-32'
				}  sm:w-auto `}
				priority={!!current}
			/>
			<Link href={track.uri} className='flex flex-col flex-1 w-3/6 my-auto '>
				{current && (
					<>
						<h2 className='text-xs text-green-400 text-opacity-75'>
							{'Currently Playing'}
						</h2>
						<TrackProgressBar
							percentComplete={track.percent_complete}
							key={track.percent_complete}
						/>
					</>
				)}
				<h3 className='text-zinc-200 sm:text-xl'>{track.name}</h3>
				<p className='text-sm text-zinc-400 sm:text-lg'>
					{track.artists.map((artist: SpotifyArtist) => artist.name).join(', ')}
				</p>
				{track.album.total_tracks > 1 && (
					<p className='text-xs text-zinc-500 sm:text-base'>
						{track.album.name}
					</p>
				)}
			</Link>
			<RecommendLink trackId={track.id} />
		</>
	);
};

export default TrackCard;