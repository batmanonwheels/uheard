import {
	AlbumRecommendationWithUser,
	TrackRecommendationWithUser,
} from '@/types/prisma';
import RecommendationCard from './RecommendationCard';
import {
	fetchUserAlbumRecommendations,
	fetchUserTrackRecommendations,
} from '@/utils/fetch-user-recommendations';

interface UserRecommendationFeedProps {
	id: string;
	name: string;
	profile: boolean;
}

const UserRecommendationFeed = async ({
	id,
	name,
	profile,
}: UserRecommendationFeedProps) => {
	const trackRecommendations = await fetchUserTrackRecommendations(id);
	const albumRecommendations = await fetchUserAlbumRecommendations(id);

	return (
		<>
			<div className='sticky z-10 flex flex-col w-full pt-2 bg-black top-12'>
				<h2 className='text-sm text-left text-green-500 font-vcr'>
					{name + ' RECOMMENDED ALBUMS'}
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
							profile={profile}
							type={'album'}
							key={i}
						/>
					)
				)}
			</ul>
			<div className='sticky z-10 flex flex-col w-full pt-2 bg-black top-12'>
				<h2 className='text-sm text-left text-green-500 font-vcr'>
					{name + ' RECOMMENDED TRACKS'}
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
							profile={profile}
							type='track'
							key={i}
						/>
					)
				)}
			</ul>
		</>
	);
};

export default UserRecommendationFeed;
