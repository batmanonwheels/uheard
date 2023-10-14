import { SpotifyArtist, SpotifyTrack } from '@/types/spotify';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import RecommendButtonBar from '@/components/RecommendButtonBar';
import { fetchTrack } from '@/utils/fetch-track';
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
		title: `Share - ${track.name} by ${track.artists[0].name} - UHEARD`,
	};
};

const RecommendPage = async ({ params }: RecommendPageProps) => {
	const { trackId } = params;
	const track: SpotifyTrack | null = await fetchTrack(trackId);

	return (
		<main className='flex flex-col items-center flex-1 w-full gap-2 p-4 text-center'>
			{track && (
				<>
					<div className='flex flex-col w-full'>
						<Image
							height={track.album.images[0].height}
							width={track.album.images[0].width}
							src={track.album.images[0].url}
							alt={`${track.name} cover art`}
							className='w-full h-auto rounded-md sm:w-4/6 sm:m-auto md:w-1/2'
						/>
						<Link href={track.uri}>
							<h3 className='pt-2 text-2xl text-zinc-200'>{track.name}</h3>
							<p className='text-lg text-zinc-400'>
								{track.artists
									.map((artist: SpotifyArtist) => artist.name)
									.join(', ')}
							</p>
							{track.album.total_tracks > 1 && (
								<p className='text-lg text-zinc-500'>{track.album.name}</p>
							)}
							<p className='text-sm text-zinc-500'>
								{`Released on ${getDate(track.album.release_date)}`}
							</p>
						</Link>
						<RecommendButtonBar trackId={trackId} />
					</div>
				</>
			)}
		</main>
	);
};

export default RecommendPage;
