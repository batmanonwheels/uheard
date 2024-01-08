'use client';

const DrawerToggle = () => {
	const toggleNavDrawer = () => {
		const drawer = document.querySelector('#drawer');
		const openToggle = document.querySelector('#openToggle');
		const closeToggle = document.querySelector('#closeToggle');
		if (drawer && openToggle && closeToggle) {
			drawer.classList.toggle('hidden');
			drawer.classList.toggle('max-h-0');
			openToggle.classList.toggle('hidden');
			closeToggle.classList.toggle('hidden');
		}
	};

	return (
		<button onClick={() => toggleNavDrawer()} className='sm:hidden'>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
				strokeWidth='1.5'
				stroke='currentColor'
				id='openToggle'
				className='w-8 h-8 text-green-500 py-auto'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
				/>
			</svg>

			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
				strokeWidth='1.5'
				stroke='currentColor'
				id='closeToggle'
				className='hidden w-8 h-8 text-green-500 py-auto'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M6 18 18 6M6 6l12 12'
				/>
			</svg>
		</button>
	);
};

export default DrawerToggle;
