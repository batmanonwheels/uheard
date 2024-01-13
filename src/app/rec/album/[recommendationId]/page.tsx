/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import { SpotifyArtist, SpotifyAlbum } from '@/types/spotify';
import { getSession } from '@/utils/get-session';
import PlayImage from '@/components/PlayImage';
import ArtistCard from '@/components/ArtistCard';
import { fetchRelatedArtists } from '@/utils/fetch-related-artists';
import { getDate } from '@/utils/get-date';
import HeardBy from '@/components/HeardBy';
import { AlbumRecommendationWithUser } from '@/types/prisma';
import { redirect } from 'next/navigation';
import { fetchAlbumRecommendation } from '@/utils/fetch-album-recommendation';
import { fetchAlbum } from '@/utils/fetch-album';
import Link from 'next/link';

interface AlbumRecommendationPageProps {
	params: { recommendationId: string };
}

export const generateMetadata = async ({
	params,
}: AlbumRecommendationPageProps): Promise<Metadata> => {
	const { recommendationId } = params;
	const recommendation: AlbumRecommendationWithUser | null =
		await fetchAlbumRecommendation(recommendationId);

	if (!recommendation) return { title: 'Recommendation | UHEARD' };

	return {
		title: `${recommendation.albumTitle} | Heard by ${recommendation.user.name} | UHEARD`,

		openGraph: {
			images: recommendation.albumImage,
		},
		twitter: {
			images: recommendation.albumImage,
		},
	};
};

const AlbumRecommendationPage = async ({
	params,
}: AlbumRecommendationPageProps) => {
	const session = await getSession();
	const { recommendationId } = params;

	const recommendation: AlbumRecommendationWithUser | null =
		await fetchAlbumRecommendation(recommendationId);

	if (!recommendation) redirect('/');

	const album: SpotifyAlbum | null = await fetchAlbum(recommendation.albumId);

	const { related: relatedArtists } = await fetchRelatedArtists(
		album?.artists[0].id!
	);

	return (
		<main className='flex flex-col items-center flex-1 w-full gap-2 p-4 text-center lg:max-h-full lg:relative lg:justify-center'>
			{recommendation && (
				<>
					<HeardBy user={recommendation.user} feed={false} />
					<div className='relative flex flex-col w-full lg:h-full lg:flex-row lg:justify-center'>
						<div className='flex flex-col w-full lg:items-center lg:h-full lg:py-10 lg:sticky lg:top-[5%]'>
							<PlayImage
								height={300}
								width={300}
								url={recommendation.albumImage}
								name={recommendation.albumTitle}
							/>
							<div>
								<h3 className='pt-2 text-2xl text-zinc-200'>
									{recommendation.albumTitle}
								</h3>
								<p className='text-lg text-zinc-400'>
									{recommendation.albumArtist
										.map((artist: string) => artist)
										.join(', ')}
								</p>
								{session && (
									<p className='text-sm text-zinc-500'>
										{await getDate(
											album?.release_date!,
											album?.release_date_precision!
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
								<a className='pt-2 text-base' href={recommendation.albumUrl}>
									SPOTIFY
								</a>
								{/* <a
									className='pt-2 text-base'
									href={'/api/tracks/apple-music?uri=' + track?.uri}
								>
									APPLE MUSIC
								</a> */}
							</div>
							{album && (
								<>
									<div className='sticky z-10 flex flex-col w-full pt-2 bg-black top-12'>
										<h2 className='text-sm text-left text-green-500 font-vcr'>
											TRACKLIST
										</h2>
										<hr className='w-full mx-auto mt-2 border-green-500' />
									</div>
									<ul className='flex flex-col flex-wrap max-w-full h-auto text-left lg:mx-auto'>
										{album.tracks.items.map((track) => (
											<Link
												href={'/tracks/recommend/' + track.id}
												className='flex justify-between gap-2 p-2 items-center lg:justify-center'
											>
												<p className='text-zinc-600 w-6 text-sm font-vcr text-center'>
													{track.track_number}
												</p>
												<p className='text-green-500 text-base flex-1 font-vcr'>
													{track.name.toUpperCase()}
												</p>
											</Link>
										))}
									</ul>
								</>
							)}
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
						</div>
					</div>
				</>
			)}
		</main>
	);
};

export default AlbumRecommendationPage;
