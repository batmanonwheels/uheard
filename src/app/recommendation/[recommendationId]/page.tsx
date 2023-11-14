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
		title: `${recommendation.trackTitle} - Recommended by ${recommendation.user.name} - UHEARD`,
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
					<div className='z-10 flex w-full gap-1 lg:absolute lg:top-0 lg:left-0 lg:w-full lg:p-4'>
						<h2 className='text-sm text-left text-green-500 font-vcr'>
							HEARD BY
						</h2>
						<a
							href={recommendation.user.spotifyUri}
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
						<div className='flex flex-col w-full lg:items-center lg:h-full lg:py-10 lg:sticky lg:top-[10%]'>
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
								<p className='text-sm text-zinc-500'>
									{await getDate(
										track?.album.release_date!,
										track?.album.release_date_precision!
									)}
								</p>
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
									className='pt-2 text-base cursor-not-allowed pointer-events-none text-zinc-500'
									href={''}
								>
									APPLE MUSIC
								</a>
							</div>
							{relatedArtists && session ? (
								<>
									<div className='sticky z-10 flex flex-col w-full pt-2 bg-black top-12'>
										<h2 className='text-sm text-left text-green-500 font-vcr'>
											RELATED ARTISTS
										</h2>
										<hr className='w-full mx-auto mt-2 border-green-500' />
									</div>
									<ul className='flex flex-row justify-evenly w-full h-fit gap-1 overflow-x-scroll rounded-lg '>
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
							{relatedTracks && session ? (
								<>
									<div className='sticky z-10 flex flex-col w-full pt-2 bg-black top-12'>
										<h2 className='text-sm text-left text-green-500 font-vcr'>
											RELATED TRACKS
										</h2>
										<hr className='w-full mx-auto mt-2 border-green-500' />
									</div>
									<ul
										className='flex flex-row items-center w-full gap-1
									overflow-x-scroll rounded-lg md:flex-row md:flex-wrap md:justify-center md:gap-6 lg:flex-col md:mt-1 snap-x snap-mandatory'
									>
										{relatedTracks.map((track: SpotifyTrack, t: number) => (
											<li
												className={`flex w-full flex-row gap-3 rounded-md p-2 text-left min-w-[90%] md:max-h-44 md:w-8/12 lg:max-h-24 lg:w-10/12 snap-start`}
												key={t}
											>
												<TrackCard track={track} current={false} />
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
