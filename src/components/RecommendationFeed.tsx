import { fetchTrackRecommendations } from '@/utils/fetch-track-recommendations';
import RecommendationCard from './RecommendationCard';
import { getSession } from '@/utils/get-session';
import { fetchAlbumRecommendations } from '@/utils/fetch-album-recommendations';
import {
	AlbumRecommendationWithUser,
	TrackRecommendationWithUser,
} from '@/types/prisma';

interface RecommendationFeedProps {}

const RecommendationFeed = async ({}: RecommendationFeedProps) => {
	const trackRecommendations = await fetchTrackRecommendations();
	const albumRecommendations = await fetchAlbumRecommendations();
	const session = await getSession();

	return (
		<>
			<div className='sticky z-10 flex flex-col w-full items-start pt-2 bg-black top-12'>
				<h2 className='text-sm text-left text-green-500 font-vcr'>
					LATEST ALBUM RECOMMENDATIONS
				</h2>
				<hr className='w-full mx-auto mt-2 border-green-500' />
			</div>
			<ul className='flex flex-col w-full justify-center sm:flex-wrap sm:flex-row md:w-10/12'>
				{albumRecommendations.map(
					(recommendation: AlbumRecommendationWithUser, i: number) => (
						<RecommendationCard
							id={recommendation.id}
							image={recommendation.albumImage}
							artists={recommendation.albumArtist}
							name={recommendation.albumTitle}
							url={recommendation.albumUrl}
							user={recommendation.user}
							profile={false}
							type={'album'}
							key={i}
						/>
					)
				)}
			</ul>
			<div className='sticky z-10 flex flex-col w-full items-start pt-2 bg-black top-12'>
				<h2 className='text-sm text-left text-green-500 font-vcr'>
					LATEST TRACK RECOMMENDATIONS
				</h2>
				<hr className='w-full mx-auto mt-2 border-green-500' />
			</div>
			<ul className='flex flex-col w-full justify-center sm:flex-wrap sm:flex-row md:w-10/12'>
				{trackRecommendations.map(
					(recommendation: TrackRecommendationWithUser, i: number) => (
						<RecommendationCard
							id={recommendation.id}
							image={recommendation.trackImage}
							artists={recommendation.trackArtist}
							album={recommendation.trackAlbum}
							name={recommendation.trackTitle}
							url={recommendation.trackUrl}
							preview={recommendation.trackPreviewUrl}
							user={recommendation.user}
							profile={false}
							type={'track'}
							key={i}
						/>
					)
				)}
			</ul>
		</>
	);
};

export default RecommendationFeed;
