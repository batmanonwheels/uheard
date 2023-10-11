import { fetchRecommendations } from '@/utils/fetch-recommendations';
import RecommendationCard from './RecommendationCard';

interface RecommendationFeedProps {}

const RecommendationFeed = async ({}: RecommendationFeedProps) => {
	const recommendations = await fetchRecommendations();

	return (
		<>
			<div className='flex flex-col w-full'>
				<h2 className='text-sm text-left text-green-500'>
					LATEST RECOMMENDATIONS
				</h2>
				<hr className='w-full mx-auto my-2 border-green-500' />
			</div>
			<ul className='flex flex-col items-center w-full gap-1 rounded-lg md:flex-row md:flex-wrap md:justify-center md:gap-6'>
				{recommendations.map(
					(recommendation: RecommendationWithUser, i: number) => (
						<RecommendationCard
							id={recommendation.id}
							image={recommendation.trackImage}
							artists={recommendation.trackArtist}
							album={recommendation.trackAlbum}
							name={recommendation.trackTitle}
							url={recommendation.trackUrl}
							preview={recommendation.trackPreviewUrl}
							user={recommendation.user}
							key={i}
						/>
					)
				)}
			</ul>
		</>
	);
};

export default RecommendationFeed;
