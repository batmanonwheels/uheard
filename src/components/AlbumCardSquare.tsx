import { SpotifyAlbum } from '@/types/spotify';
import RecommendLink from './RecommendLink';
import Image from 'next/image';

interface AlbumCardSquareProps {
	album: SpotifyAlbum;
}

const AlbumCardSquare = ({ album }: AlbumCardSquareProps) => {
	return (
		<li
			className={`flex flex-row h-32 w-full gap-3 rounded-md p-2 text-left justify-between sm:h-full sm:w-3/6 sm:flex-col md:w-4/12 lg:w-3/12`}
		>
			<Image
				height={album.images[0].height}
				width={album.images[0].width}
				src={album.images[0].url}
				alt={`${album.name} cover art`}
				className={`my-auto h-full w-full rounded-md flex-1`}
			/>
			<section className='flex flex-row h-full w-full justify-between items-center'>
				<div className='flex flex-col'>
					<h3 className='text-zinc-100'>{album.name}</h3>
					<p className='text-sm text-zinc-300 '>
						{album.artists.map((artist) => artist.name).join(', ')}
					</p>
				</div>
				<RecommendLink albumId={album.id} />
			</section>
		</li>
	);
};

export default AlbumCardSquare;
