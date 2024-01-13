import {
	SpotifyTrackArtist,
	SpotifyTrack,
	SpotifyArtist,
	SpotifyAlbum,
} from '@/types/spotify';
import type { Metadata } from 'next';
import RecommendButtonBar from '@/components/RecommendButtonBar';
import PlayImage from '@/components/PlayImage';
import { getDate } from '@/utils/get-date';
import ArtistCard from '@/components/ArtistCard';
import { fetchRelatedArtists } from '@/utils/fetch-related-artists';
import { fetchAlbum } from '@/utils/fetch-album';
import Link from 'next/link';
import { redirect } from 'next/navigation';

interface AlbumRecommendPageProps {
	params: { albumId: string };
}

export const generateMetadata = async ({
	params,
}: AlbumRecommendPageProps): Promise<Metadata> => {
	const { albumId } = params;
	const album: SpotifyAlbum | null = await fetchAlbum(albumId);

	if (!album) return { title: 'Create Recommendation | UHEARD' };
	return {
		title: `${album.name} by ${album.artists[0].name} | UHEARD`,
		openGraph: {
			images: album.images[0].url,
		},
		twitter: {
			images: album.images[0].url,
		},
	};
};

const AlbumRecommendPage = async ({ params }: AlbumRecommendPageProps) => {
	const { albumId } = params;
	const album: SpotifyAlbum | null = await fetchAlbum(albumId);

	if (!album || !album.tracks.items) redirect('/');

	const { related: relatedArtists } = await fetchRelatedArtists(
		album?.artists[0].id!
	);

	return (
		<main className='flex flex-col items-center flex-1 w-full gap-2 p-4 text-center lg:max-h-full lg:relative lg:justify-center'>
			{album && (
				<>
					<div className='relative flex flex-col w-full lg:h-full lg:flex-row lg:justify-center'>
						<div className='flex flex-col w-full lg:items-center lg:h-full lg:py-10 lg:sticky lg:top-[10%]'>
							<PlayImage
								height={300}
								width={300}
								url={album.images[0].url}
								name={album.name}
							/>
							<div>
								<h3 className='pt-2 text-2xl text-zinc-200'>{album.name}</h3>
								<p className='text-lg text-zinc-400'>
									{album.artists
										.map((artist: SpotifyTrackArtist) => artist.name)
										.join(', ')}
								</p>
								<p className='text-sm text-zinc-500'>
									{await getDate(
										album.release_date,
										album.release_date_precision
									)}
								</p>
							</div>
						</div>
						<div className='flex flex-col w-full'>
							<RecommendButtonBar albumId={albumId} />
							<div className='sticky z-10 flex flex-col w-full pt-2 bg-black top-12'>
								<h2 className='text-sm text-left text-green-500 font-vcr'>
									STREAM
								</h2>
								<hr className='w-full mx-auto mt-2 border-green-500' />
							</div>
							<div className='flex flex-row py-2 text-green-500 justify-evenly font-vcr'>
								<a className='pt-2 text-base' href={album.uri}>
									SPOTIFY
								</a>
								{/* <a
									className='pt-2 text-base'
									href={'/api/tracks/apple-music?uri=' + album.uri}
								>
									APPLE MUSIC
								</a> */}
							</div>

							<div className='sticky z-10 flex flex-col w-full pt-2 bg-black top-12'>
								<h2 className='text-sm text-left text-green-500 font-vcr'>
									TRACKLIST
								</h2>
								<hr className='w-full mx-auto mt-2 border-green-500' />
							</div>
							<ul className='flex flex-col flex-wrap w-full text-left max-h-96 overflow-x-scroll sm:max-h-none sm:overflow-x-auto lg:text-center'>
								{album.tracks.items.map((track) => (
									<Link
										href={'/tracks/recommend/' + track.id}
										className='flex justify-between gap-2 p-2 min-w-[50%]  items-center lg:justify-center'
									>
										<p className='text-zinc-600 text-sm font-vcr'>
											{track.track_number}
										</p>
										<p className='text-green-500 text-base flex-1 font-vcr'>
											{track.name.toUpperCase()}
										</p>
									</Link>
								))}
							</ul>

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

export default AlbumRecommendPage;
