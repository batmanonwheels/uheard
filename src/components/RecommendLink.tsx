'use client';

import { useRouter } from 'next/navigation';

interface RecommendLinkProps {
	trackId?: string;
	albumId?: string;
}

const RecommendLink = ({ trackId, albumId }: RecommendLinkProps) => {
	const router = useRouter();

	const handleTrackLink = async (trackId: string) => {
		router.push(`/tracks/recommend/${trackId}`);
	};

	const handleAlbumLink = async (albumId: string) => {
		router.push(`/albums/recommend/${albumId}`);
	};
	if (albumId) {
		return (
			<button
				className={'text-green-500 font-vcr'}
				onClick={() => handleAlbumLink(albumId)}
			>
				SHARE
			</button>
		);
	}

	return (
		<button
			className={'text-green-500 font-vcr'}
			onClick={() => handleTrackLink(trackId!)}
		>
			SHARE
		</button>
	);
};

export default RecommendLink;
