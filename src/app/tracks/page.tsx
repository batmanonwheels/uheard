import Link from 'next/link';
import { redirect } from 'next/navigation';
import CurrentTrack from '@/components/CurrentTrack';
import type { Metadata } from 'next';
import TrackList from '@/components/TrackList';
import TrackListSearch from '@/components/TrackListSearch';
import { getSession } from '@/utils/get-session';

interface TrackPageProps {
	searchParams: {
		t: string;
		l: string;
		q: string;
	};
}

export const dynamic = 'force-dynamic';

export const generateMetadata = async ({
	searchParams,
}: TrackPageProps): Promise<Metadata> => {
	const session = await getSession();
	const { t: type } = searchParams;

	if (!session) return { title: 'Your Spotify Tracks - UHEARD' };

	switch (type) {
		case 'search':
			return {
				title: `Search - UHEARD`,
			};
		case 'liked':
			return {
				title: `${session.user.name.split(' ')[0]}'s Liked Tracks - UHEARD`,
			};
		default:
			return {
				title: `${session.user.name.split(' ')[0]}'s Recent Tracks - UHEARD`,
			};
	}
};

const TrackPage = async ({ searchParams }: TrackPageProps) => {
	const session = await getSession();
	if (!session) redirect('/');

	const limit = parseInt(searchParams.l);
	const type = searchParams.t;

	if (!limit)
		redirect('/tracks?' + new URLSearchParams({ t: type, l: 10 + '' }));

	const trackListTypes: string[] = ['search', 'recent', 'liked'];

	return (
		<main className='relative flex flex-col items-center flex-1 w-full p-4 text-center '>
			<CurrentTrack />
			<div className='sticky z-0 flex flex-row w-full py-2 bg-black top-12 justify-evenly md:pt-0 md:z-10 md:top-3 md:w-5/6 md:bg-transparent'>
				{trackListTypes.map((trackListType, i) => (
					<div key={i}>
						<Link
							href={`/tracks?t=${trackListType}&l=${limit}&q=`}
							scroll={false}
							className={`text-left text-sm  font-vcr ${
								type === `${trackListType}` ? 'text-green-500' : 'text-zinc-400'
							}`}
							key={i}
						>
							{trackListType.toUpperCase()}
						</Link>
						{type === `${trackListType}` && (
							<hr className='w-full mt-1 border-green-500 rounded-xl' />
						)}
					</div>
				))}
			</div>

			{/* <div className='sticky z-0 flex flex-col w-full py-2 bg-black top-12 justify-evenly md:pt-0 md:z-10 md:top-3 md:w-5/6 md:bg-transparent'>
				<div className='flex justify-between w-full'>
					{trackListTypes.map((trackListType, i) => (
						<Link
							href={`/tracks?t=${trackListType}&l=${limit}&q=`}
							scroll={false}
							className={`text-left text-sm ${
								type === `${trackListType}` ? 'text-green-500' : 'text-zinc-400'
							}`}
							replace
							key={i}
						>
							{trackListType.toUpperCase()}
						</Link>
					))}
				</div>
				<hr className='w-full mx-auto my-2 border-green-500' />
			</div> */}

			{type === 'liked' || type === 'recent' ? (
				<TrackList searchParams={searchParams} />
			) : (
				<TrackListSearch searchParams={searchParams} />
			)}
		</main>
	);
};

export default TrackPage;
