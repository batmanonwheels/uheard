import { SpotifyArtist, SpotifyTrack } from '@/types/spotify';
import type { Metadata } from 'next';
import Link from 'next/link';
import RecommendButtonBar from '@/components/RecommendButtonBar';
import { fetchTrack } from '@/utils/fetch-track';
import PlayImage from '@/components/PlayImage';
import { getDate } from '@/utils/get-date';

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
	};
};

const RecommendPage = async ({ params }: RecommendPageProps) => {
	const { trackId } = params;
	const track: SpotifyTrack | null = await fetchTrack(trackId);

	return (
		<main className='flex flex-col items-center flex-1 w-full h-full gap-2 p-4 text-center lg:relative lg:justify-center'>
			{track && (
				<>
					<div className='relative flex flex-col w-full lg:h-full lg:flex-row lg:justify-center'>
						<div className='flex flex-col w-full lg:justify-center lg:h-full lg:items-center lg:m-auto lg:py-10 lg:sticky lg:top-[0%]'>
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
										.map((artist: SpotifyArtist) => artist.name)
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
						<div className='flex flex-col w-full h-full'>
							<div className='sticky z-10 flex flex-col w-full pt-2 bg-black top-12'>
								<h2 className='text-sm text-left text-green-500 font-vcr'>
									STREAM
								</h2>
								<hr className='w-full mx-auto mt-2 border-green-500' />
							</div>
							<div className='flex flex-row py-2 text-green-500 justify-evenly font-vcr'>
								<Link className='pt-2 text-base' href={track.uri}>
									SPOTIFY
								</Link>
								<Link className='pt-2 text-base' href={''}>
									APPLE MUSIC
									<span className='my-auto font-sans text-sm text-zinc-500'>
										{' (Coming Soon!)'}
									</span>
								</Link>
							</div>
							<RecommendButtonBar trackId={trackId} />
						</div>
					</div>
				</>
			)}
		</main>
	);
};

export default RecommendPage;
