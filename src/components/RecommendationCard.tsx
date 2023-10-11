/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';

interface RecommendationCardProps {
	id: number;
	image: string;
	name: string;
	artists: string[];
	album: string;
	url: string;
	preview: string;
	user: {
		id: string;
		name: string;
		picture: string;
		spotifyUri: string;
	};
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
}: RecommendationCardProps) => {
	return (
		<li
			className={`flex w-full flex-col  rounded-md py-2 text-left md:max-h-44 md:w-5/12`}
		>
			<div
				className={`flex w-full flex-row gap-3 rounded-md text-left md:max-h-44 md:w-5/12`}
			>
				<Link
					href={url}
					className='items-center w-3/12 h-full my-auto rounded-md max-h-36 sm:w-auto '
				>
					<Image
						height={300}
						width={300}
						src={image}
						alt={`${name} cover art`}
						className={`my-auto h-full w-full  items-center rounded-md sm:w-auto `}
					/>
				</Link>
				<div className='flex flex-col flex-1 my-auto '>
					<Link
						href={`/recommendation/${id}`}
						className='flex flex-col flex-1 my-auto '
					>
						<h3 className='text-zinc-200 sm:text-lg'>{name}</h3>
						<p className='text-sm text-zinc-400 sm:text-lg'>
							{artists.join(', ')}
						</p>
						<p className='text-xs text-zinc-500 sm:text-base'>{album}</p>
					</Link>
					<div className='flex justify-end gap-1 px-2'>
						<p className='text-xs '>Recommended by</p>
						<Link
							href={user.spotifyUri}
							className='flex items-center gap-1 justify-evenly'
						>
							<img
								src={user.picture}
								alt={`${user.name}'s profile picture`}
								className='w-auto h-4 rounded-sm '
							/>
							<p className='text-xs text-green-400'>{user.name} </p>
						</Link>
					</div>
				</div>
			</div>
		</li>
	);
};

export default RecommendationCard;
