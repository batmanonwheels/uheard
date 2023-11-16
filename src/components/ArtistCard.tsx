import { SpotifyArtist } from '@/types/spotify';
import Image from 'next/image';
import Link from 'next/link';

interface ArtistCardProps {
	artist: SpotifyArtist;
}

const ArtistCard = ({ artist }: ArtistCardProps) => {
	const { images, name, uri } = artist;

	return (
		<li className={`max-w-full h-full`}>
			<Link
				href={uri}
				className={`flex flex-col gap-3 rounded-md p-2 w-full h-full my-auto text-center`}
			>
				<Image
					height={175}
					width={175}
					src={images[0].url}
					alt={`${name}'s photo`}
					className={`my-auto h-full  aspect-square object-cover items-center rounded-md `}
				/>
				<h3 className='text-zinc-300 text-left'>{name}</h3>
			</Link>
		</li>
	);
};

export default ArtistCard;
