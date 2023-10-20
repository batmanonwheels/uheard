'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface RecommendButtonBarProps {
	trackId: string;
}

const RecommendButtonBar = ({ trackId }: RecommendButtonBarProps) => {
	const [isRecommended, setIsRecommended] = useState<boolean>(false);

	const router = useRouter();

	const handleReturn = () => {
		router.back();
	};

	const handleRecommendation = async (trackId: string) => {
		const { ok } = await fetch(
			'/api/tracks/recommend?' +
				new URLSearchParams({
					track: trackId,
				}),
			{
				method: 'POST',
			}
		);

		if (!ok) return;

		setIsRecommended(true);
		router.push('/');
		router.refresh();
		return;
	};

	return (
		<>
			<div className='sticky z-10 flex flex-col w-full pt-2 bg-black top-12'>
				<h2 className='text-sm text-left text-green-500 font-vcr'>
					CREATE RECOMMENDATION
				</h2>
				<hr className='w-full mx-auto mt-2 border-green-500' />
			</div>
			<div className='flex w-full py-3 justify-evenly font-vcr '>
				<button
					onClick={() => handleRecommendation(trackId)}
					className='text-green-500'
				>
					{isRecommended ? 'DONE!' : 'SHARE'}
				</button>
				<button onClick={() => handleReturn()} className='text-green-600'>
					RETURN
				</button>
			</div>
		</>
	);
};

export default RecommendButtonBar;
