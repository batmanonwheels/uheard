import type { Metadata } from 'next';
import { fetchRecommendation } from '@/utils/fetch-recommendation';
import { Recommendation } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

interface RecommendPageProps {
	params: { recommendationId: string };
}

export const generateMetadata = async ({
	params,
}: RecommendPageProps): Promise<Metadata> => {
	const { recommendationId } = params;
	const recommendation: RecommendationWithUser | null =
		await fetchRecommendation(recommendationId);

	if (!recommendation) return { title: 'Recommendation - UHEARD' };

	return {
		title: `${recommendation.trackTitle} - Recommended by ${recommendation.user.name} - UHEARD`,
	};
};

const RecommendPage = async ({ params }: RecommendPageProps) => {
	const { recommendationId } = params;
	const recommendation: Recommendation | null =
		await fetchRecommendation(recommendationId);

	return (
		<main className='flex flex-col items-center flex-1 w-full gap-2 p-4 text-center'>
			{recommendation && (
				<>
					<div className='flex flex-col w-full'>
						<Image
							height={300}
							width={300}
							src={recommendation.trackImage}
							alt={`${recommendation.trackTitle} cover art`}
							className='w-full h-auto rounded-md sm:w-4/6 sm:m-auto md:w-1/2'
						/>
						<h3 className='pt-2 text-2xl text-zinc-200'>
							{recommendation.trackTitle}
						</h3>
						<p className='text-lg text-zinc-400'>
							{recommendation.trackArtist
								.map((artist: string) => artist)
								.join(', ')}
						</p>
						<p className='text-lg text-zinc-500'>{recommendation.trackAlbum}</p>

						<div className='z-10 flex flex-col w-full pt-2 bg-black'>
							<h2 className='text-sm text-left text-green-500 font-vcr'>
								LISTEN
							</h2>
							<hr className='w-full mx-auto mt-2 border-green-500' />
						</div>
						<div className='flex flex-row py-2 justify-evenly font-vcr text-green-500'>
							<Link className='pt-2 text-base' href={recommendation.trackUrl}>
								SPOTIFY
							</Link>
							<Link className='pt-2 text-base' href={''}>
								APPLE MUSIC
								<span className=' text-sm text-zinc-500 font-sans my-auto'>
									{' (Coming Soon!)'}
								</span>
							</Link>
						</div>
					</div>
				</>
			)}
		</main>
	);
};

export default RecommendPage;
