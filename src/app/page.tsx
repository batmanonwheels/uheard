/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import { getSession } from '@/utils/get-session';
import RecommendationFeed from '@/components/RecommendationFeed';

interface HomeProps {
	searchParams: { modal: string | undefined };
}

export const generateMetadata = async ({}: HomeProps): Promise<Metadata> => {
	return {
		title: `Home | UHEARD`,
	};
};

const Home = async ({ searchParams }: HomeProps) => {
	const session = await getSession();

	const { modal } = searchParams;

	return (
		<main className='flex flex-col items-center flex-1 w-full pt-0 p-4 text-left'>
			<RecommendationFeed />
		</main>
	);
};

export default Home;
