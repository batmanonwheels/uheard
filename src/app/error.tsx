'use client';

import Link from 'next/link';

//import

interface ErrorProps {}

const Error = ({}: ErrorProps) => {
	return (
		<main className='flex flex-col items-center flex-1 w-full p-4 text-center'>
			<h1 className='p-2 pb-3 text-xl'>An error has occured.</h1>
			<Link href={'/'} className='text-green-500 font-vcr'>
				RETURN HOME
			</Link>
		</main>
	);
};

export default Error;
