/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import DeleteButton from './DeleteButton';
import PlayImage from './PlayImage';
import HeardBy from './HeardBy';

interface RecommendationCardProps {
	id: number;
	image: string;
	name: string;
	artists: string[];
	album: string;
	url: string;
	preview: string;
	user: UserPersonalData;
	profile: boolean;
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
	profile,
}: RecommendationCardProps) => {
	if (profile) {
		return (
			<li
				className={`flex flex-row h-32 w-full gap-3 rounded-md p-2 text-left justify-between sm:h-full sm:w-3/6 sm:flex-col lg:w-4/12`}
			>
				<Image
					height={300}
					width={300}
					src={image}
					alt={`${name} cover art`}
					className={` h-full w-auto sm:w-full rounded-md`}
					loading='lazy'
				/>
				<section className='flex flex-row gap-1 h-full w-full items-center'>
					<Link
						href={`/rec/${id}`}
						className='flex flex-col flex-1 h-full justify-center sm:justify-start'
					>
						<h3 className='text-zinc-100 text-base'>{name}</h3>
						<p className='text-sm text-zinc-300'>{artists.join(', ')}</p>
						<p className='text-xs text-zinc-400 hidden md:block'>{album}</p>
					</Link>
					<DeleteButton recommendationId={id} />
				</section>
			</li>
		);
	}

	return (
		<Link
			href={`/rec/${id}`}
			className={`flex flex-row h-32 w-full gap-3 rounded-md p-2 text-left justify-between sm:h-full sm:w-3/6 sm:flex-col md:w-4/12`}
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
