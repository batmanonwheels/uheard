'use client';

import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';

import { useState } from 'react';

//import

interface LoadTracksButtonProps {
	limit: number;
	type: string;
	query?: string;
}

const LoadTracksButton = ({ limit, type, query }: LoadTracksButtonProps) => {
	const router = useRouter();

	const loadMoreTracks = (limit: number, query: string | undefined) => {
		limit += 12;

		if (limit > 48)
			return router.replace(`/tracks?t=${type}&l=50`, { scroll: false });

		if (query)
			return router.replace(`/tracks?t=${type}&l=${limit}&q=${query}`, {
				scroll: false,
			});

		router.replace(`/tracks?t=${type}&l=${limit}`, { scroll: false });
	};

	return (
		<>
			{limit < 48 && (
				<button
					onClick={() => loadMoreTracks(limit ? limit! : 10, query)}
					className='py-2 text-green-500  font-vcr'
				>
					LOAD MORE
				</button>
			)}
		</>
	);
};

export default LoadTracksButton;
