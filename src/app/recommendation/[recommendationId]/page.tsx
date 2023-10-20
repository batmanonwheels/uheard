/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import { fetchRecommendation } from '@/utils/fetch-recommendation';
import Image from 'next/image';
import Link from 'next/link';
import TrackCard from '@/components/TrackCard';
import { SpotifyTrack } from '@/types/spotify';
import { getSession } from '@/utils/get-session';
import { fetchRelatedTracks } from '@/utils/fetch-related-tracks';
import Playbar from '@/components/Playbar';

interface RecommendPageProps {
	params: { recommendationId: string };
}

export const generateMetadata = async ({
	params,
}: RecommendPageProps): Promise<Metadata> => {
	const { recommendationId } = params;
	const { recommendation }: RecommendationWithUser | null =
		await fetchRecommendation(recommendationId);

	if (!recommendation) return { title: 'Recommendation - UHEARD' };

	return {
		title: `${recommendation.trackTitle} - Recommended by ${recommendation.user.name} - UHEARD`,
	};
};

const RecommendPage = async ({ params }: RecommendPageProps) => {
	const session = await getSession();
	const { recommendationId } = params;

	const recommendation = await fetchRecommendation(recommendationId);

	const { related: relatedTracks } = await fetchRelatedTracks(
		recommendation.trackId
	);

	return (
		<main className='flex flex-col items-center flex-1 w-full gap-2 p-4 text-center lg:max-h-full lg:relative'>
			{recommendation && (
				<>
					<div className='z-10 flex w-full gap-1 lg:absolute lg:top-0 lg:left-0 lg:w-full lg:p-4'>
						<h2 className='text-sm text-left text-green-500 font-vcr'>
							HEARD BY
						</h2>
						<Link
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
						</Link>
					</div>
					<div className='flex flex-col w-full lg:h-full lg:flex-row relative lg:justify-center'>
						<div className='flex flex-col w-full lg:justify-center lg:items-center lg:m-auto lg:py-10 lg:sticky lg:top-[0%]'>
							<Image
								height={300}
								width={300}
								src={recommendation.trackImage}
								alt={`${recommendation.trackTitle} cover art`}
								className='w-full h-auto rounded-md sm:w-4/6 sm:m-auto md:w-1/2 lg:w-3/4 '
							/>
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
							<Playbar preview={recommendation.trackPreviewUrl} />
						</div>
						<div className='flex flex-col w-full'>
							<div className='sticky z-10 flex flex-col w-full pt-2 bg-black top-12'>
								<h2 className='text-sm text-left text-green-500 font-vcr'>
									STREAM
								</h2>
								<hr className='w-full mx-auto mt-2 border-green-500' />
							</div>
							<div className='flex flex-row py-2 justify-evenly font-vcr text-green-500'>
								<Link className='pt-2 text-base' href={recommendation.trackUrl}>
									SPOTIFY
								</Link>
								<Link className='pt-2 text-base' href={''}>
									APPLE MUSIC
									<span className=' text-sm text-zinc-500 font-sans my-auto'>
										{' (Coming Soon!)'}
									</span>
								</Link>
							</div>
							{relatedTracks && session && (
								<>
									<div className='sticky z-10 flex flex-col w-full pt-2  bg-black top-12'>
										<h2 className='text-sm text-left text-green-500 font-vcr'>
											RELATED TRACKS
										</h2>
										<hr className='w-full mx-auto mt-2 border-green-500' />
									</div>
									<ul className='flex flex-col items-center w-full rounded-lg gap-1 md:flex-row md:flex-wrap md:justify-center md:gap-6 lg:flex-col md:mt-1'>
										{relatedTracks.map((track: SpotifyTrack, t: number) => (
											<li
												className={`flex w-full flex-row gap-3 rounded-md p-2 text-left max-w-full md:max-h-44 md:w-8/12 lg:max-h-24 lg:w-10/12`}
												key={t}
											>
												<TrackCard track={track} current={false} />
											</li>
										))}
									</ul>
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
