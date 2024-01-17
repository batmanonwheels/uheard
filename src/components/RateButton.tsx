'use client';

import { useRouter } from 'next/navigation';

interface RateButtonProps {
	rating: string[];
	trackRecommendationId?: number;
	albumRecommendationId?: number;
}

const RateButton = ({
	rating,
	trackRecommendationId,
	albumRecommendationId,
}: RateButtonProps) => {
	const router = useRouter();

	const handleRateRecommendation = async () => {
		if (trackRecommendationId) {
			const { ok } = await fetch('/api/tracks/rate', {
				method: 'PATCH',
				body: JSON.stringify({
					id: trackRecommendationId.toString(),
					rating: rating.join(''),
				}),
			});

			if (!ok) return;
		}

		if (albumRecommendationId) {
			const { ok } = await fetch('/api/albums/rate', {
				method: 'PATCH',
				body: JSON.stringify({
					id: albumRecommendationId.toString(),
					rating: rating.join(''),
				}),
			});

			if (!ok) return;
		}

		router.refresh();
		return;
	};

	return (
		<button
			onClick={() => handleRateRecommendation()}
			className='text-green-500 font-vcr'
		>
			CONFIRM
		</button>
	);
};

export default RateButton;
