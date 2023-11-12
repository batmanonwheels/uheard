/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import DeleteButton from './DeleteButton';
import PlayImage from './PlayImage';

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
	return (
		<li
			className={`flex w-full relative gap-3 rounded-md py-2 text-left md:max-h-44 md:w-5/12`}
		>
			<div className='w-3/12 h-full my-auto max-h-36 sm:w-auto flex flex-col gap-1'>
				<Image
					height={300}
					width={300}
					src={image}
					alt={`${name} cover art`}
					className={`w-full h-full my-auto max-h-36 sm:w-auto items-center rounded-md sm:h-full`}
				/>
			</div>
			<div className='flex flex-row items-stretch justify-between flex-1 my-auto'>
				<Link
					href={`/recommendation/${id}`}
					className='flex flex-col flex-1 h-full'
				>
					{!profile && (
						<div className='flex-1 flex gap-1 rounded-md'>
							<h2 className='text-xs text-left text-green-500 font-vcr text-opacity-75'>
								HEARD BY
							</h2>
							<a
								href={user.spotifyUri}
								className='flex items-center gap-1 justify-evenly'
							>
								<img
									src={user.picture}
									alt={`${user.name}'s profile picture`}
									className='w-auto h-4 rounded-sm '
								/>
								<p className='text-xs text-green-400 font-vcr text-opacity-75'>
									{user.name.toUpperCase()}{' '}
								</p>
							</a>
						</div>
					)}
					<h3 className='text-zinc-100 text-base'>{name}</h3>
					<p className='text-sm text-zinc-300'>{artists.join(', ')}</p>
					<p className='text-xs text-zinc-400'>{album}</p>

					{/* <Link
					href={`/recommendation/${id}`}
					className='flex flex-col flex-1 my-auto h-full'
				>
					<h3 className='text-zinc-200 sm:text-lg'>{name}</h3>
					<p className='text-sm text-zinc-400 sm:text-lg'>
						{artists.join(', ')}
					</p>
					<p className='text-xs text-zinc-500 sm:text-base'>{album}</p>
					{!profile && (
						<div className='flex-1 flex gap-1 rounded-md'>
							<h2 className='text-xs text-left text-green-500 font-vcr'>
								HEARD BY
							</h2>
							<a
								href={user.spotifyUri}
								className='flex items-center gap-1 justify-evenly'
							>
								<img
									src={user.picture}
									alt={`${user.name}'s profile picture`}
									className='w-auto h-4 rounded-sm '
								/>
								<p className='text-xs text-green-400 font-vcr'>
									{user.name.toUpperCase()}{' '}
								</p>
							</a>
						</div>
					)} */}
					{/* <p className='text-xs text-zinc-500 sm:text-base'>{album}</p>
					<p className='text-sm text-zinc-400 sm:text-lg'>
						{artists.join(', ')}
					</p>
					<h3 className='text-zinc-200 sm:text-lg'>{name}</h3> */}
				</Link>
				{profile && <DeleteButton recommendationId={id} />}
			</div>
		</li>
	);
};

export default RecommendationCard;
