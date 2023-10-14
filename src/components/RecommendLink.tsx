'use client';

import { useRouter } from 'next/navigation';

interface RecommendLinkProps {
	trackId: string;
}

const RecommendLink = ({ trackId }: RecommendLinkProps) => {
	const router = useRouter();

	const handleLink = async (trackId: string) => {
		router.push(`tracks/recommend/${trackId}`);
	};

	return (
		<button
			className={'text-green-500  font-vcr'}
			onClick={() => handleLink(trackId)}
		>
			SHARE
		</button>
	);
};

export default RecommendLink;
