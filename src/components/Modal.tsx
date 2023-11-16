import Image from 'next/image';
import Link from 'next/link';

const Modal = () => {
	return (
		<div
			className='fixed z-30 inset-0 overflow-y-auto'
			aria-labelledby='modal-title'
			role='dialog'
			aria-modal='true'
		>
			<div className='flex items-end justify-center min-h-full pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
				<Link
					href={'/'}
					className='fixed inset-0 bg-green-800 bg-opacity-75 transition-opacity cursor-default crt'
					aria-hidden='true'
				></Link>
				<span
					className='hidden sm:inline-block sm:align-middle sm:h-screen'
					aria-hidden='true'
				>
					&#8203;
				</span>
				<div className='inline-block align-bottom bg-black border-green-500 border-2 px-4 pt-5 pb-4 text-left overflow-hidden rounded-md shadow-md shadow-black transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'>
					<div className='sm:flex sm:items-start '>
						<div className=''>
							<div className=' flex flex-col w-fulL'>
								<h2 className='text-base text-left text-green-500 font-vcr'>
									{"WHAT'S NEW? (TUES, NOV 14 2023)"}
								</h2>
								<hr className='w-full mx-auto mt-2 border-green-500' />
							</div>
							<div className='mt-2'>
								<p className='text-sm text-gray-200 py-3'>
									{
										"Install the 'Share on UHEARD!' iOS Shortcut to share your favorite tracks directly from the Spotify App!"
									}
								</p>
								<Image
									src={
										'https://utfs.io/f/110eda9f-012d-4ff8-be11-0730ad08b10d-1xbbz8.jpg'
									}
									width={300}
									height={400}
									className='w-full pt-3'
									alt='Share on UHEARD sample image'
								/>
							</div>
						</div>
					</div>
					<div className='mt-5 flex gap-4 justify-evenly sm:justify-end'>
						<Link
							href={
								'https://www.icloud.com/shortcuts/f565521e7d38442ba1467ce553ffa881'
							}
							className='py-1 text-sm text-green-500 font-vcr'
						>
							<p>INSTALL</p>
						</Link>
						<Link href={'/'} className='py-1 text-sm text-green-600 font-vcr'>
							<p>RETURN</p>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
