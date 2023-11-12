import Link from 'next/link';

const Modal = () => {
	return (
		<div
			className='fixed z-30 inset-0 overflow-y-auto'
			aria-labelledby='modal-title'
			role='dialog'
			aria-modal='true'
		>
			<div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
				<Link
					href={'/'}
					className='fixed inset-0 bg-green-800 bg-opacity-75 transition-opacity cursor-default'
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
									{"WHAT'S NEW? (MONDAY, NOV 12 2023)"}
								</h2>
								<hr className='w-full mx-auto mt-2 border-green-500' />
							</div>
							<div className='mt-2'>
								<p className='text-xs text-gray-200'>
									{
										"Install the 'Share on UHEARD!' iOS Shortcut to share your favorite tracks directly from the Spotify App!"
									}
								</p>
								{/* <p className='text-sm '>
									INSTALL THE UHEARD iOS SHORTCUT TO SHARE YOUR FAVORITE TRACKS
									DIRECTLY FROM THE SPOTIFY APP!
								</p> */}
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
