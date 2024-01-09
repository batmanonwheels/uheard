/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import { fetchRecommendation } from '@/utils/fetch-recommendation';
import TrackCard from '@/components/TrackCard';
import { SpotifyTrack, SpotifyArtist } from '@/types/spotify';
import { getSession } from '@/utils/get-session';
import { fetchRelatedTracks } from '@/utils/fetch-related-tracks';
import PlayImage from '@/components/PlayImage';
import { fetchTrack } from '@/utils/fetch-track';
import ArtistCard from '@/components/ArtistCard';
import { fetchRelatedArtists } from '@/utils/fetch-related-artists';
import { getDate } from '@/utils/get-date';
import Image from 'next/image';
import RecommendLink from '@/components/RecommendLink';

interface RecommendPageProps {
	params: { recommendationId: string };
}

export const generateMetadata = async ({
	params,
}: RecommendPageProps): Promise<Metadata> => {
	const { recommendationId } = params;
	const recommendation: RecommendationWithUser | null =
		await fetchRecommendation(recommendationId);

	if (!recommendation) return { title: 'Recommendation - UHEARD' };

	return {
		title: `${recommendation.trackTitle} - Heard by ${recommendation.user.name} - UHEARD`,

		openGraph: {
			images: recommendation.trackImage,
		},
		twitter: {
			images: recommendation.trackImage,
		},
	};
};

const RecommendPage = async ({ params }: RecommendPageProps) => {
	const session = await getSession();
	const { recommendationId } = params;

	const recommendation: RecommendationWithUser | null =
		await fetchRecommendation(recommendationId);

	const { related: relatedTracks } = await fetchRelatedTracks(
		recommendation.trackId
	);

	const track: SpotifyTrack | null = await fetchTrack(recommendation.trackId);

	const { related: relatedArtists } = await fetchRelatedArtists(
		track?.artists[0].id!
	);

	return (
		<main className='flex flex-col items-center flex-1 w-full gap-2 p-4 text-center lg:max-h-full lg:relative lg:justify-center'>
			{recommendation && (
				<>
					<div className='z-10 flex w-full gap-1 lg:absolute lg:top-0 lg:w-full lg:p-4'>
						<h2 className='text-sm text-left text-green-500 font-vcr'>
							HEARD BY
						</h2>
						<a
							href={'/u/' + recommendation.user.username}
							className='flex items-center gap-1 justify-evenly'
						>
							<img
								src={recommendation.user.picture}
								alt={`${recommendation.user.name}'s profile picture`}
								className='w-auto h-4 rounded-sm '
							/>
							<p className='text-sm text-green-400 font-vcr'>
								{recommendation.user.name.toUpperCase()}{' '}
							</p>
						</a>
					</div>
					<div className='relative flex flex-col w-full lg:h-full lg:flex-row lg:justify-center'>
						<div className='flex flex-col w-full lg:items-center lg:h-full lg:py-10 lg:sticky lg:top-[5%]'>
							<PlayImage
								height={300}
								width={300}
								url={recommendation.trackImage}
								name={recommendation.trackTitle}
								preview={recommendation.trackPreviewUrl}
							/>
							<div>
								<h3 className='pt-2 text-2xl text-zinc-200'>
									{recommendation.trackTitle}
								</h3>
								<p className='text-lg text-zinc-400'>
									{recommendation.trackArtist
										.map((artist: string) => artist)
										.join(', ')}
								</p>
								<p className='text-lg text-zinc-500'>
									{recommendation.trackAlbum}
								</p>
								{session && (
									<p className='text-sm text-zinc-500'>
										{await getDate(
											track?.album.release_date!,
											track?.album.release_date_precision!
										)}
									</p>
								)}
							</div>
						</div>
						<div className='flex flex-col w-full'>
							<div className='sticky z-10 flex flex-col w-full pt-2 bg-black top-12'>
								<h2 className='text-sm text-left text-green-500 font-vcr'>
									STREAM
								</h2>
								<hr className='w-full mx-auto mt-2 border-green-500' />
							</div>
							<div className='flex flex-row py-2 text-green-500 justify-evenly font-vcr'>
								<a className='pt-2 text-base' href={recommendation.trackUrl}>
									SPOTIFY
								</a>
								<a
									className='pt-2 text-base'
									href={'/api/tracks/apple-music?uri=' + track?.uri}
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
															<p className='text-xs text-zinc-400 hidden md:block'>
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
