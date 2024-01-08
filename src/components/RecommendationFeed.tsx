import { fetchRecommendations } from '@/utils/fetch-recommendations';
import RecommendationCard from './RecommendationCard';
import { getSession } from '@/utils/get-session';
import { Session } from 'lucia';

interface RecommendationFeedProps {}

const RecommendationFeed = async ({}: RecommendationFeedProps) => {
	const recommendations = await fetchRecommendations();
	const session = await getSession();

	const checkIfOwned = (recUserId: string) => {
		if (session === null) return false;

		if (session.user.id === recUserId) return true;

		return false;
	};

	return (
		<>
			<div className='sticky z-10 flex flex-col w-full items-start pt-2 bg-black top-12'>
				<h2 className='text-sm text-left text-green-500 font-vcr'>
					LATEST RECOMMENDATIONS
				</h2>
				<hr className='w-full mx-auto mt-2 border-green-500' />
			</div>
			<ul className='flex flex-col w-full justify-center sm:flex-wrap sm:flex-row md:w-10/12'>
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
							profile={false}
							key={i}
						/>
					)
				)}
			</ul>
		</>
	);
};

export default RecommendationFeed;
