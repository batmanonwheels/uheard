'use client';

import { useState } from 'react';
import ModalToggle from './ModalToggle';
import Rate from './Rate';
import RateButton from './RateButton';

interface RateRecommendationModalProps {
	trackRecommendationId?: number;
	albumRecommendationId?: number;
}

const RateRecommendationModal = ({
	trackRecommendationId,
	albumRecommendationId,
}: RateRecommendationModalProps) => {
	const [rating, setRating] = useState<string[]>(['○', '○', '○', '○', '○']);

	return (
		<div
			className='modal rate hidden absolute z-30 inset-0 h-full w-full'
			id={`rate-${trackRecommendationId ? 'track' : 'album'}-modal-${
				trackRecommendationId ? trackRecommendationId : albumRecommendationId
			}`}
			aria-labelledby='modal-title'
			role='dialog'
			aria-modal='true'
		>
			<div className='flex items-center justify-center min-h-full w-full text-center sm:block sm:p-0'>
				<div className='bg-black flex flex-col gap-1 border-green-500 border p-5 pt-2 items-center rounded-md shadow-md w-full shadow-black sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'>
					<Rate
						rating={rating}
						setRating={setRating}
						trackRecommendationId={trackRecommendationId}
						albumRecommendationId={albumRecommendationId}
					/>
					<hr className='w-full mt-1 border-green-500' />
					<div className='mt-2 flex gap-4 justify-evenly w-full sm:justify-end'>
						<RateButton
							rating={rating}
							trackRecommendationId={trackRecommendationId}
							albumRecommendationId={albumRecommendationId}
						/>
						<ModalToggle
							trackRecommendationId={trackRecommendationId}
							albumRecommendationId={albumRecommendationId}
							text='RETURN'
							type='DELETE'
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RateRecommendationModal;

// <div
// 	className='modal rate hidden absolute z-30 inset-0 min-h-full min-w-full'
// 	id={`rate-${trackRecommendationId ? 'track' : 'album'}-modal-${
// 		trackRecommendationId ? trackRecommendationId : albumRecommendationId
// 	}`}
// 	aria-labelledby='modal-title'
// 	role='dialog'
// 	aria-modal='true'
// >
// 	<div className='flex h-full w-full text-center'>
// 		<div className='bg-black border-green-500 border text-left rounded-md shadow-md shadow-black sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'>
// 			<div className='flex flex-col w-fulL'>
// <Rate
// 	rating={rating}
// 	setRating={setRating}
// 	trackRecommendationId={trackRecommendationId}
// 	albumRecommendationId={albumRecommendationId}
// />
// 				<hr className='w-full mx-auto mt-2 border-green-500' />
// 			</div>
// 			<div className='mt-5 flex gap-4 justify-evenly sm:justify-end w-full'>
// 				<RateButton
// 					rating={rating}
// 					trackRecommendationId={trackRecommendationId}
// 					albumRecommendationId={albumRecommendationId}
// 				/>
// 				<ModalToggle
// 					trackRecommendationId={trackRecommendationId}
// 					albumRecommendationId={albumRecommendationId}
// 					text='RETURN'
// 					type='RATE'
// 				/>
// 			</div>
// 		</div>
// 	</div>
// </div>
