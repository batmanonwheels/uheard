import { SpotifyArtist, SpotifyTrack } from '@/types/spotify';
import RecommendLink from './RecommendLink';
import Image from 'next/image';

interface TrackCardSquareProps {
	track: SpotifyTrack;
}

const TrackCardSquare = ({ track }: TrackCardSquareProps) => {
	return (
		<li
			className={`flex flex-row h-32 w-full gap-3 rounded-md p-2 text-left justify-between sm:h-full sm:w-3/6 sm:flex-col md:w-4/12 lg:w-3/12`}
		>
			<Image
				height={track.album.images[0].height}
				width={track.album.images[0].width}
				src={track.album.images[0].url}
				alt={`${track.name} cover art`}
				className={`my-auto h-full w-full rounded-md flex-1`}
			/>
			<section className='flex flex-row h-full w-full justify-between items-center'>
				<div className='flex flex-col'>
					<h3 className='text-zinc-100'>{track.name}</h3>
					<p className='text-sm text-zinc-300 '>
						{track.artists
							.map((artist: SpotifyArtist) => artist.name)
							.join(', ')}
					</p>
					{track.album.total_tracks > 1 && (
						<p className='text-xs text-zinc-400'>{track.album.name}</p>
					)}
				</div>
				<RecommendLink trackId={track.id} />
			</section>
		</li>
	);
};

export default TrackCardSquare;
