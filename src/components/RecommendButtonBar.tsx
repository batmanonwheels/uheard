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
		router.back();
		return;
	};

	return (
		<div className='flex w-full py-3 justify-evenly font-vcr '>
			<button onClick={() => handleReturn()} className='text-green-600'>
				RETURN
			</button>
			<button
				onClick={() => handleRecommendation(trackId)}
				className='text-green-500'
			>
				{isRecommended ? 'DONE!' : 'SHARE'}
			</button>
		</div>
	);
};

export default RecommendButtonBar;
