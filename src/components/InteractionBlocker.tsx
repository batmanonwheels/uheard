'use client';

const InteractionBlocker = () => {
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
		<button
			onClick={() => toggleNavDrawer()}
			className='fixed inset-0 bg-opacity-75 transition-opacity cursor-default z-[25]'
			aria-hidden='true'
		></button>
	);
};

export default InteractionBlocker;
