'use client';

interface ModalToggleProps {
	trackRecommendationId?: number;
	albumRecommendationId?: number;
	text: 'DELETE' | 'RATE' | 'RETURN';
	type: 'DELETE' | 'RATE';
}

const ModalToggle = ({
	trackRecommendationId,
	albumRecommendationId,
	text,
	type,
}: ModalToggleProps) => {
	if (type === 'RATE') {
		const toggleRateRecommendationPrompt = async () => {
			const visibleModal = document.querySelector('.modal:not(.hidden)');

			if (visibleModal) visibleModal.classList.toggle('hidden');

			const modal = document.querySelector(
				`#rate-${trackRecommendationId ? 'track' : 'album'}-modal-${
					trackRecommendationId ? trackRecommendationId : albumRecommendationId
				}`
			);

			if (!modal || text === 'RETURN') return;

			modal.classList.toggle('hidden');
		};

		return (
			<button
				onClick={() => toggleRateRecommendationPrompt()}
				className='text-green-500 font-vcr '
			>
				{text}
			</button>
		);
	}

	const toggleDeleteRecommendationPrompt = async () => {
		const visibleModal = document.querySelector('.modal:not(.hidden)');

		if (visibleModal) visibleModal.classList.toggle('hidden');

		const modal = document.querySelector(
			`#delete-${trackRecommendationId ? 'track' : 'album'}-modal-${
				trackRecommendationId ? trackRecommendationId : albumRecommendationId
			}`
		);

		if (!modal || text === 'RETURN') return;

		modal.classList.toggle('hidden');
	};

	return (
		<button
			onClick={() => toggleDeleteRecommendationPrompt()}
			className='text-green-500 font-vcr '
		>
			{text}
		</button>
	);
};

export default ModalToggle;
