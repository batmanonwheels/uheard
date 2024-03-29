import { SpotifyArtist, SpotifyTrack } from '@/types/spotify';
import { fetchCurrentTrack } from '@/utils/fetch-current-track';
import TrackProgressBar from './TrackProgressBar';
import RecommendLink from './RecommendLink';
import Image from 'next/image';

interface CurrentTrackProps {
	id: string;
	type: 'track' | 'album' | 'profile';
}

const CurrentTrack = async ({ id, type }: CurrentTrackProps) => {
	//current track
	const track: SpotifyTrack | null | undefined = await fetchCurrentTrack(id);

	if (type === 'profile') {
		return (
			track && (
				<div
					className={`border flex w-full flex-row gap-3 rounded-md border-green-400 p-2 text-left mb-2 sm:max-h-40 sm:w-8/12 md:w-7/12 lg:max-h-56`}
				>
					<Image
						height={track.album.images[0].height}
						width={track.album.images[0].width}
						src={track.album.images[0].url}
						alt={`${track.name} cover art`}
						className={`my-auto h-full max-h-32 w-3/12 rounded-md md:max-h-36 lg:max-h-52 sm:w-auto sm:h-full`}
						priority={true}
					/>
					<div className='flex flex-col flex-1 w-3/6 my-auto '>
						<h2 className='py-1 text-xs text-green-400 text-opacity-75 font-vcr'>
							{'CURRENTLY PLAYING'}
						</h2>
						<TrackProgressBar
							playing={track.is_playing}
							pos={track.progress_ms}
							length={track.duration_ms}
							key={track.percent_complete}
						/>
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
				</div>
			)
		);
	}

	if (type === 'album') {
		return (
			track &&
			track.album.total_tracks > 1 && (
				<div
					className={`border flex w-full flex-row gap-3 rounded-md border-green-400 p-2 text-left mb-2 sm:max-h-40 sm:w-8/12 md:w-7/12 lg:max-h-56`}
				>
					<Image
						height={track.album.images[0].height}
						width={track.album.images[0].width}
						src={track.album.images[0].url}
						alt={`${track.name} cover art`}
						className={`my-auto h-full max-h-32 w-3/12 rounded-md md:max-h-36 lg:max-h-52 sm:w-auto sm:h-full`}
						priority={true}
					/>
					<div className='flex flex-col flex-1 w-3/6 my-auto '>
						<h2 className='py-1 text-xs text-green-400 text-opacity-75 font-vcr'>
							{'CURRENTLY LISTENING TO'}
						</h2>
						<h3 className='text-zinc-100'>{track.album.name}</h3>
						<p className='text-sm text-zinc-300 '>
							{track.artists
								.map((artist: SpotifyArtist) => artist.name)
								.join(', ')}
						</p>
					</div>
					<RecommendLink albumId={track.album.id} />
				</div>
			)
		);
	}

	return (
		track && (
			<div
				className={`border flex w-full flex-row gap-3 rounded-md border-green-400 p-2 text-left mb-2 sm:max-h-40 sm:w-8/12 md:w-7/12 lg:max-h-56`}
			>
				<Image
					height={track.album.images[0].height}
					width={track.album.images[0].width}
					src={track.album.images[0].url}
					alt={`${track.name} cover art`}
					className={`my-auto h-full max-h-32 w-3/12 rounded-md md:max-h-36 lg:max-h-52 sm:w-auto sm:h-full`}
					priority={true}
				/>
				<div className='flex flex-col flex-1 w-3/6 my-auto '>
					<h2 className='py-1 text-xs text-green-400 text-opacity-75 font-vcr'>
						{'CURRENTLY PLAYING'}
					</h2>
					<TrackProgressBar
						playing={track.is_playing}
						pos={track.progress_ms}
						length={track.duration_ms}
						key={track.percent_complete}
					/>
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
			</div>
		)
	);
};

export default CurrentTrack;
