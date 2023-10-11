import { SpotifyTrack } from '@/types/spotify';
import type { Metadata } from 'next';
import { fetchRecommendation } from '@/utils/fetch-recommendation';
import { Recommendation } from '@prisma/client';

interface RecommendPageProps {
	params: { recommendationId: string };
}

export const generateMetadata = async ({
	params,
}: RecommendPageProps): Promise<Metadata> => {
	const { recommendationId } = params;
	const recommendation: RecommendationWithUser | null =
		await fetchRecommendation(recommendationId);

	if (!recommendation) return { title: 'Recommendation - uheard' };

	return {
		title: `${recommendation.trackTitle} - Recommended by ${recommendation.user.name} - uheard`,
	};
};

const RecommendPage = async ({ params }: RecommendPageProps) => {
	const { recommendationId } = params;
	const recommendation: SpotifyTrack | null =
		await fetchRecommendation(recommendationId);

	const months: string[] = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	return (
		<main className='flex justify-center flex-1 w-full p-4 text-center'>
			{recommendation && (
				<>
					{/* <div className="flex flex-col p-2">
            <Image
              height={track.album.images[0].height}
              width={track.album.images[0].width}
              src={track.album.images[0].url}
              alt={`${track.name} cover art`}
              className="w-full pb-2 rounded-xs"
            />
            <Link href={track.uri}>
              <h3 className="text-2xl text-zinc-200">{track.name}</h3>
              <p className="text-lg text-zinc-400">
                {track.artists
                  .map((artist: SpotifyArtist) => artist.name)
                  .join(", ")}
              </p>
              {track.album.total_tracks > 1 && (
                <p className="text-lg text-zinc-500">{track.album.name}</p>
              )}
              <p className="text-sm text-zinc-500">
                {`Released on ${
                  months[parseInt(track.album.release_date.split("-")[1]) - 1]
                } ${parseInt(track.album.release_date.split("-")[2])}, ${
                  track.album.release_date.split("-")[0]
                }`}
              </p>
            </Link>
            <RecommendButtonBar trackId={trackId} />
          </div> */}
				</>
			)}
		</main>
	);
};

export default RecommendPage;
