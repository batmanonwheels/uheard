'use client';

import { useRouter } from 'next/navigation';

interface DeleteButtonProps {
	recommendationId: number;
}

const DeleteButton = ({ recommendationId }: DeleteButtonProps) => {
	const router = useRouter();

	const handleDeleteRecommendation = async () => {
		const { ok } = await fetch(
			'/api/recommendations?' +
				new URLSearchParams({
					recommendation: recommendationId.toString(),
				}),
			{
				method: 'DELETE',
			}
		);

		if (!ok) return;

		router.refresh();
		return;
	};

	return (
		<button
			onClick={() => handleDeleteRecommendation()}
			className='text-green-500 font-vcr '
		>
			DELETE
		</button>
	);
};

export default DeleteButton;
