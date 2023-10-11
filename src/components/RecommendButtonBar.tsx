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
		<div className='flex w-full py-3 justify-evenly'>
			<button onClick={() => handleReturn()}>Return</button>
			<button onClick={() => handleRecommendation(trackId)}>
				{isRecommended ? 'Done!' : 'Share'}
			</button>
		</div>
	);
};

export default RecommendButtonBar;
