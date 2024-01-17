import Image from 'next/image';
import Link from 'next/link';
import DeleteButton from './DeleteButton';
import ModalToggle from './ModalToggle';

interface ConfirmDeleteModalProps {
	trackRecommendationId?: number;
	albumRecommendationId?: number;
}

const ConfirmDeleteModal = ({
	trackRecommendationId,
	albumRecommendationId,
}: ConfirmDeleteModalProps) => {
	return (
		<div
			className='modal delete hidden absolute z-30 inset-0 h-full w-full'
			id={`delete-${trackRecommendationId ? 'track' : 'album'}-modal-${
				trackRecommendationId ? trackRecommendationId : albumRecommendationId
			}`}
			aria-labelledby='modal-title'
			role='dialog'
			aria-modal='true'
		>
			<div className='flex items-center justify-center min-h-full w-full text-center sm:p-0'>
				<div className='bg-black border-green-500 border p-5 text-left rounded-md shadow-md shadow-black sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'>
					<div className='flex flex-col w-full mt-1'>
						<h2 className='text-base text-left text-green-500 font-vcr'>
							{'ARE YOU SURE YOU WANT TO DELETE THIS?'}
						</h2>
						<hr className='w-full mx-auto mt-2 border-green-500' />
					</div>
					<div className='mt-2 flex gap-4 justify-evenly  sm:gap-8'>
						<DeleteButton
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

export default ConfirmDeleteModal;
