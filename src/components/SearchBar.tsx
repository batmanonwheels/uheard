'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface SearchBarProps {
	searchParams: {
		l: string;
		q: string;
	};
}

const SearchBar = ({ searchParams }: SearchBarProps) => {
	const router = useRouter();

	const limit = parseInt(searchParams.l);
	const { q: query } = searchParams;

	const [searchQuery, setSearchQuery] = useState<string>('');

	const handleSearchQuery = async (value: string) => {
		setSearchQuery(value);
		router.push(`/tracks?t=search&l=${limit}&q=${value}`);
	};

	return (
		<section className='relative flex flex-col w-full mx-auto mt-1 h-11 sm:w-10/12'>
			<form>
				<input
					placeholder={'What song would you like to share?'}
					className='flex-1 text-base p-3 rounded-md outline-none bg-zinc-900 text-green-500 focus:border-none focus:outline-green-500 w-full h-full  pr-8 '
					type='text'
					value={searchQuery}
					onChange={(e) => handleSearchQuery(e.target.value)}
				/>
				<button
					className='absolute inset-y-0 right-1 m-auto grid h-[1.35rem] place-items-center pr-2 text-sm text-zinc-200 font-vcr'
					onClick={(e) => handleSearchQuery('')}
				>
					CLEAR
				</button>
			</form>
		</section>
	);
};

export default SearchBar;
