/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import DeleteButton from './DeleteButton';
import PlayImage from './PlayImage';
import HeardBy from './HeardBy';
import { UserPersonalData } from '@/types/prisma';

interface RecommendationCardProps {
	id: number;
	image: string;
	name: string;
	artists: string[];
	album?: string;
	url: string;
	preview?: string;
	user: UserPersonalData;
	profile: boolean;
	type: 'album' | 'track';
}

const RecommendationCard = ({
	id,
	image,
	name,
	artists,
	album,
	url,
	preview,
	user,
	type,
	profile,
}: RecommendationCardProps) => {
	if (profile) {
		return (
			<section className='flex flex-row h-32 w-full gap-3 rounded-md p-2 text-left justify-between sm:h-full sm:w-3/6 sm:flex-col lg:w-4/12'>
				<Link
					href={type === 'album' ? '/rec/album/' + id : '/rec/track/' + id}
					className={`flex flex-1 flex-row h-full w-full gap-3 rounded-md p-2 text-left justify-between sm:h-full sm:w-full sm:flex-col`}
				>
					<Image
						height={300}
						width={300}
						src={image}
						alt={`${name} cover art`}
						className={` h-full w-auto sm:w-full rounded-md`}
						loading='lazy'
					/>
					<div className='flex flex-col flex-1 h-full justify-center sm:justify-start'>
						<h3 className='text-zinc-100 text-base'>{name}</h3>
						<p className='text-sm text-zinc-300'>{artists.join(', ')}</p>
						<p className='text-xs text-zinc-400 hidden md:block'>{album}</p>
					</div>
				</Link>
				<DeleteButton
					albumRecommendationId={type === 'album' ? id : undefined}
					trackRecommendationId={type === 'track' ? id : undefined}
				/>
			</section>
		);
	}
	// <section className='flex sm:h-full sm:w-3/6 sm:flex-col lg:w-4/12'>
	// 			<Link
	// 				href={type === 'album' ? '/rec/album/' + id : '/rec/track/' + id}
	// 				className={`flex flex-1 flex-row h-32 w-full gap-3 rounded-md p-2 text-left justify-between sm:h-full sm:w-3/6 sm:flex-col lg:w-4/12`}
	// 			>
	// 				<Image
	// 					height={300}
	// 					width={300}
	// 					src={image}
	// 					alt={`${name} cover art`}
	// 					className={` h-full w-auto sm:w-full rounded-md`}
	// 					loading='lazy'
	// 				/>
	// 				<div className='flex flex-col flex-1 h-full justify-center sm:justify-start'>
	// 					<h3 className='text-zinc-100 text-base'>{name}</h3>
	// 					<p className='text-sm text-zinc-300'>{artists.join(', ')}</p>
	// 					<p className='text-xs text-zinc-400 hidden md:block'>{album}</p>
	// 				</div>
	// 			</Link>
	// 			<DeleteButton
	// 				albumRecommendationId={type === 'album' ? id : undefined}
	// 				trackRecommendationId={type === 'track' ? id : undefined}
	// 			/>
	// 		</section>

	return (
		<Link
			href={type === 'album' ? '/rec/album/' + id : '/rec/track/' + id}
			className={`flex flex-row h-32 w-full gap-3 rounded-md p-2 text-left justify-between sm:h-full sm:w-3/6 sm:flex-col lg:w-4/12`}
		>
			<Image
				height={300}
				width={300}
				src={image}
				alt={`${name} cover art`}
				className={`my-auto h-full w-auto sm:w-full rounded-md`}
				loading='lazy'
			/>
			{user && (
				<div className='flex flex-col flex-1 h-full justify-center sm:justify-start'>
					<HeardBy user={user} feed={true} />
					<h3 className='text-zinc-100 text-base'>{name}</h3>
					<p className='text-sm text-zinc-300'>{artists.join(', ')}</p>
					{/* <p className='text-xs text-zinc-400'>{album}</p> */}
				</div>
			)}
		</Link>
	);
};

export default RecommendationCard;
