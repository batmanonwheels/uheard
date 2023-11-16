import {
	SpotifyTrackArtist,
	SpotifyTrack,
	SpotifyArtist,
} from '@/types/spotify';
import type { Metadata } from 'next';
import RecommendButtonBar from '@/components/RecommendButtonBar';
import { fetchTrack } from '@/utils/fetch-track';
import PlayImage from '@/components/PlayImage';
import { getDate } from '@/utils/get-date';
import ArtistCard from '@/components/ArtistCard';
import TrackCard from '@/components/TrackCard';
import { fetchRelatedArtists } from '@/utils/fetch-related-artists';
import { fetchRelatedTracks } from '@/utils/fetch-related-tracks';
import TrackCardSquare from '@/components/TrackCardSquare';
import Image from 'next/image';
import RecommendLink from '@/components/RecommendLink';

interface RecommendPageProps {
	params: { trackId: string };
}

export const generateMetadata = async ({
	params,
}: RecommendPageProps): Promise<Metadata> => {
	const { trackId } = params;
	const track: SpotifyTrack | null = await fetchTrack(trackId);

	if (!track) return { title: 'Create Recommendation - UHEARD' };
	return {
		title: `${track.name} by ${track.artists[0].name} - UHEARD`,
		openGraph: {
			images: track.album.images[0].url,
		},
		twitter: {
			images: track.album.images[0].url,
		},
	};
};

const RecommendPage = async ({ params }: RecommendPageProps) => {
	const { trackId } = params;
	const track: SpotifyTrack | null = await fetchTrack(trackId);

	const { related: relatedTracks } = await fetchRelatedTracks(track?.id!);

	const { related: relatedArtists } = await fetchRelatedArtists(
		track?.artists[0].id!
	);

	return (
		<main className='flex flex-col items-center flex-1 w-full gap-2 p-4 text-center lg:max-h-full lg:relative lg:justify-center'>
			{track && (
				<>
					<div className='relative flex flex-col w-full lg:h-full lg:flex-row lg:justify-center'>
						<div className='flex flex-col w-full lg:items-center lg:h-full lg:py-10 lg:sticky lg:top-[10%]'>
							<PlayImage
								height={300}
								width={300}
								url={track.album.images[0].url}
								name={track.name}
								preview={track.preview_url}
							/>
							<div>
								<h3 className='pt-2 text-2xl text-zinc-200'>{track.name}</h3>
								<p className='text-lg text-zinc-400'>
									{track.artists
										.map((artist: SpotifyTrackArtist) => artist.name)
										.join(', ')}
								</p>
								<p className='text-lg text-zinc-500'>{track.album.name}</p>
								<p className='text-sm text-zinc-500'>
									{await getDate(
										track.album.release_date,
										track.album.release_date_precision
									)}
								</p>
							</div>
						</div>
						<div className='flex flex-col w-full'>
							<RecommendButtonBar trackId={trackId} />
							<div className='sticky z-10 flex flex-col w-full pt-2 bg-black top-12'>
								<h2 className='text-sm text-left text-green-500 font-vcr'>
									STREAM
								</h2>
								<hr className='w-full mx-auto mt-2 border-green-500' />
							</div>
							<div className='flex flex-row py-2 text-green-500 justify-evenly font-vcr'>
								<a className='pt-2 text-base' href={track.uri}>
									SPOTIFY
								</a>
								<a
									className='pt-2 text-base cursor-not-allowed pointer-events-none text-zinc-500'
									href={''}
								>
									APPLE MUSIC
								</a>
							</div>

							{relatedArtists ? (
								<>
									<div className='sticky z-10 flex flex-col w-full pt-2 bg-black top-12'>
										<h2 className='text-sm text-left text-green-500 font-vcr'>
											RELATED ARTISTS
										</h2>
										<hr className='w-full mx-auto mt-2 border-green-500' />
									</div>
									<ul className='flex flex-row justify-evenly w-full md:max-h-fit gap-1'>
										{relatedArtists.map((artist: SpotifyArtist, t: number) => (
											<ArtistCard artist={artist} key={t} />
										))}
									</ul>
								</>
							) : (
								<>
									<div className='sticky z-10 flex flex-col w-full pt-2 bg-black top-12'>
										<h2 className='text-sm text-left text-green-500 font-vcr'>
											RELATED ARTISTS
										</h2>
										<hr className='w-full mx-auto mt-2 border-green-500' />
									</div>
									<p className='h-full pt-4 m-auto text-base'>
										Login to view more details!
									</p>
								</>
							)}
							{relatedTracks ? (
								<>
									<div className='sticky z-10 flex flex-col w-full pt-2 bg-black top-12'>
										<h2 className='text-sm text-left text-green-500 font-vcr'>
											RELATED TRACKS
										</h2>
										<hr className='w-full mx-auto mt-2 border-green-500' />
									</div>
									{/* <ul className='flex flex-row items-center w-full gap-1 overflow-x-scroll snap-x snap-mandatory md:flex-wrap md:justify-center md:gap-6 lg:flex-col md:mt-1 md:snap-none md:overflow-x-auto'> */}
									{/* <ul className='flex flex-row w-full justify-center overflow-x-scroll snap-x snap-mandatory sm:flex-wrap md:w-10/12'> */}
									<ul
										className='flex flex-row items-center h-full w-full gap-1
										overflow-x-scroll md:flex-row md:flex-wrap md:justify-evenly md:items-start md:mt-1 md:my-0 snap-x snap-mandatory md:snap-normal md:overflow-x-visible md:snap-none'
									>
										{relatedTracks.map((track: SpotifyTrack, t: number) => (
											<li
												className={`flex w-full flex-row gap-3 p-2 text-left  items-center min-w-[92.5%] h-fit snap-start md:items-baseline md:h-auto md:snap-align-none md:w-5/12 md:min-w-0 md:flex-col `}
												key={t}
											>
												<Image
													height={track.album.images[0].height}
													width={track.album.images[0].width}
													src={track.album.images[0].url}
													alt={`${track.name} cover art`}
													className={`h-auto w-4/12 rounded-md md:h-full md:w-full md:flex-none`}
												/>
												<section className='flex flex-row h-full w-full justify-between items-center md:flex-1'>
													<div className='flex flex-col my-auto'>
														<h3 className='text-zinc-100'>{track.name}</h3>
														<p className='text-sm text-zinc-300 '>
															{track.artists
																.map((artist: SpotifyArtist) => artist.name)
																.join(', ')}
														</p>
														{track.album.total_tracks > 1 && (
															<p className='text-xs text-zinc-400'>
																{track.album.name}
															</p>
														)}
													</div>
													<RecommendLink trackId={track.id} />
												</section>
											</li>
										))}
									</ul>
								</>
							) : (
								<>
									<div className='sticky z-10 flex flex-col w-full pt-2 bg-black top-12'>
										<h2 className='text-sm text-left text-green-500 font-vcr'>
											RELATED TRACKS
										</h2>
										<hr className='w-full mx-auto mt-2 border-green-500' />
									</div>
									<p className='h-full pt-4 m-auto text-base'>
										Login to view more details!
									</p>
								</>
							)}
						</div>
					</div>
				</>
			)}
		</main>
	);
};

export default RecommendPage;

// <li
// 	className={`flex flex-row w-full h-32 gap-3 p-2 text-left justify-between snap-start md:w-3/6 md:flex-col`}
// 	key={t}
// >
// 	<Image
// 		height={track.album.images[0].height}
// 		width={track.album.images[0].height}
// 		src={track.album.images[0].url}
// 		alt={`${track.name} cover art`}
// 		className={`my-auto h-full w-full rounded-md flex-1`}
// 	/>
// 	<section className='flex flex-row h-full w-full justify-between items-center'>
// 		<div className='flex flex-col'>
// 			<h3 className='text-zinc-100'>{track.name}</h3>
// 			<p className='text-sm text-zinc-300 '>
// 				{track.artists
// 					.map((artist: SpotifyArtist) => artist.name)
// 					.join(', ')}
// 			</p>
// 			{track.album.total_tracks > 1 && (
// 				<p className='text-xs text-zinc-400'>
// 					{track.album.name}
// 				</p>
// 			)}
// 		</div>
// 		<RecommendLink trackId={track.id} />
// 	</section>
// </li>
