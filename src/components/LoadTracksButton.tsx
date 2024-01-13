'use client';

import { useRouter } from 'next/navigation';

//import

interface LoadTracksButtonProps {
	limit: number;
	type: string;
	query?: string;
	albums?: boolean;
	tracks?: boolean;
}

const LoadTracksButton = ({
	limit,
	type,
	query,
	albums,
	tracks,
}: LoadTracksButtonProps) => {
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

	const loadMoreAlbums = (limit: number, query: string | undefined) => {
		limit += 12;

		if (limit > 48)
			return router.replace(`/albums?t=${type}&l=50`, { scroll: false });

		if (query)
			return router.replace(`/albums?t=${type}&l=${limit}&q=${query}`, {
				scroll: false,
			});

		router.replace(`/albums?t=${type}&l=${limit}`, { scroll: false });
	};

	return (
		<>
			{limit < 48 && (
				<button
					onClick={() =>
						albums
							? loadMoreAlbums(limit ? limit! : 10, query)
							: loadMoreTracks(limit ? limit! : 10, query)
					}
					className='py-2 text-green-500  font-vcr'
				>
					LOAD MORE
				</button>
			)}
		</>
	);
};

export default LoadTracksButton;
