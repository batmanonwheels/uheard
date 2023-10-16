import RecommendationCard from './RecommendationCard';
import { fetchUserRecommendations } from '@/utils/fetch-user-recommendations';

interface RecommendationFeedProps {
	id: string;
}

const RecommendationFeed = async ({ id }: RecommendationFeedProps) => {
	const recommendations = await fetchUserRecommendations(id);

	return (
		<>
			<div className='sticky z-10 flex flex-col w-full pt-2 bg-black top-12'>
				<h2 className='text-sm text-left text-green-500 font-vcr'>
					YOUR RECOMMENDATIONS
				</h2>
				<hr className='w-full mx-auto mt-2 border-green-500' />
			</div>
			<ul className='flex flex-col items-center w-full gap-1 pt-3 rounded-lg md:flex-row md:flex-wrap md:justify-center md:gap-6'>
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
							profile={true}
							key={i}
						/>
					)
				)}
			</ul>
		</>
	);
};

export default RecommendationFeed;
