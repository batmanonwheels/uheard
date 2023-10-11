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
					className='flex-1 w-full h-full p-3 pr-8 text-base rounded-lg outline-none bg-zinc-950 text-zinc-300 focus:border-none focus:outline-green-500 '
					type='text'
					value={searchQuery}
					onChange={(e) => handleSearchQuery(e.target.value)}
				/>
				<button
					className='absolute inset-y-0 right-1 m-auto grid h-[1.35rem] place-items-center pr-2 text-sm text-zinc-200'
					onClick={(e) => handleSearchQuery('')}
				>
					Clear
				</button>
			</form>
		</section>
	);
};

export default SearchBar;
