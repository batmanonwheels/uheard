'use client';

import { useRouter } from 'next/navigation';

interface DeleteButtonProps {
	trackRecommendationId?: number;
	albumRecommendationId?: number;
}

const DeleteButton = ({
	trackRecommendationId,
	albumRecommendationId,
}: DeleteButtonProps) => {
	const router = useRouter();

	const handleDeleteRecommendation = async () => {
		if (trackRecommendationId) {
			const { ok } = await fetch(
				'/api/tracks/recommend?' +
					new URLSearchParams({
						recommendation: trackRecommendationId.toString(),
					}),
				{
					method: 'DELETE',
				}
			);

			if (!ok) return;
		}

		if (albumRecommendationId) {
			const { ok } = await fetch(
				'/api/albums/recommend?' +
					new URLSearchParams({
						recommendation: albumRecommendationId.toString(),
					}),
				{
					method: 'DELETE',
				}
			);

			if (!ok) return;
		}

		router.refresh();
		return;
	};

	return (
		<button
			onClick={() => handleDeleteRecommendation()}
			className='text-green-500 font-vcr '
		>
			CONFIRM
		</button>
	);
};

export default DeleteButton;
