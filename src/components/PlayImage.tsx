/* eslint-disable @next/next/no-img-element */
'use client';

import Image from 'next/image';
import { SyntheticEvent, useState } from 'react';

interface PlayImageProps {
	height: number;
	width: number;
	url: string;
	name: string;
	preview: string;
}

const PlayImage = ({ height, width, url, name, preview }: PlayImageProps) => {
	const [currentTime, setCurrentTime] = useState<string>('0%');

	const handlePlay = (position = 0) => {
		const player: HTMLAudioElement | null = document.querySelector('#player');
		const playButton: HTMLAudioElement | null =
			document.querySelector('#playButton');
		const pauseButton: HTMLAudioElement | null =
			document.querySelector('#pauseButton');

		if (!player || !playButton || !pauseButton) return;

		if (!player.paused && position !== 0) {
			player.currentTime = position;
			player.play();
			playButton.style.display = 'none';
			pauseButton.style.display = 'inline';
			return;
		}

		if (!player.paused) {
			player.pause();
			player.currentTime = position;
			playButton.style.display = 'inline';
			pauseButton.style.display = 'none';
			return;
		}

		if (player.paused && position !== 0) {
			player.currentTime = position;
			player.play();
			playButton.style.display = 'none';
			pauseButton.style.display = 'inline';
			return;
		}

		player.currentTime = position;
		player.play();
		playButton.style.display = 'none';
		pauseButton.style.display = 'inline';
	};

	const handleReset = (e: SyntheticEvent<HTMLAudioElement>) => {
		const player: HTMLAudioElement | null = e.target as HTMLAudioElement;
		const playButton: HTMLAudioElement | null =
			document.querySelector('#playButton');
		const pauseButton: HTMLAudioElement | null =
			document.querySelector('#pauseButton');

		if (!player || !playButton || !pauseButton) return;

		player.currentTime = 0;

		playButton.style.display = 'inline';
		pauseButton.style.display = 'none';
		return;
	};

	const handlePlayBar = (e: SyntheticEvent<HTMLAudioElement>) => {
		if (currentTime === '100%') return setCurrentTime('0%');
		const playbar = e.target as HTMLAudioElement;

		if (!playbar.currentTime || !playbar.duration) return;

		setCurrentTime(
			Math.round(((playbar.currentTime as number) / playbar.duration) * 100) +
				'%'
		);
	};

	const handleSkip = (e: React.MouseEvent<HTMLDivElement>) => {
		const player: HTMLAudioElement | null = document.querySelector('#player');
		const playbar: HTMLDivElement | null = document.querySelector('#playbar');

		if (!player || !playbar) return;

		const target = e.currentTarget as HTMLDivElement;
		const currentPosition = e.clientX - target.getBoundingClientRect().left;
		const width = playbar.offsetWidth;
		const percentage = Math.round((currentPosition / width) * 100);

		const greenHR = playbar.children[0] as HTMLHRElement;
		greenHR.style.width = percentage + '%';

		handlePlay((percentage / 100) * player.duration);
	};

	return (
		<div className='flex flex-col gap-2'>
			<div
				className={`w-full h-auto rounded-md sm:w-4/6 sm:m-auto relative lg:w-full`}
			>
				<Image
					height={height}
					width={width}
					src={url}
					alt={`${name} cover art`}
					className='w-full h-full rounded-md cursor-pointer'
				/>
				<div
					className='absolute top-0 z-10 flex items-center justify-center w-full h-full'
					onClick={() => handlePlay()}
				>
					<svg
						id='playButton'
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 60 60'
						className='h-auto m-auto cursor-pointer w-28 fill-green-500'
					>
						<g>
							<path
								d='M45.563,29.174l-22-15c-0.307-0.208-0.703-0.231-1.031-0.058C22.205,14.289,22,14.629,22,15v30
		c0,0.371,0.205,0.711,0.533,0.884C22.679,45.962,22.84,46,23,46c0.197,0,0.394-0.059,0.563-0.174l22-15
		C45.836,30.64,46,30.331,46,30S45.836,29.36,45.563,29.174z M24,43.107V16.893L43.225,30L24,43.107z'
							/>
							<path
								d='M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30
		S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z'
							/>
						</g>
					</svg>
					<svg
						id='pauseButton'
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 60 60'
						className='h-auto m-auto cursor-pointer w-28 fill-green-500'
						style={{ display: 'none' }}
					>
						<g>
							<path
								d='M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30
		S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z'
							/>
							<path d='M33,46h8V14h-8V46z M35,16h4v28h-4V16z' />
							<path d='M19,46h8V14h-8V46z M21,16h4v28h-4V16z' />
						</g>
					</svg>
				</div>
				<audio
					id='player'
					src={preview}
					className=''
					onTimeUpdate={(e) => handlePlayBar(e)}
					onEnded={(e) => handleReset(e)}
				/>
				<div
					className='absolute bottom-0 z-20 flex flex-row w-full rounded-md cursor-pointer h-fit'
					onClick={(e) => handleSkip(e)}
					id='playbar'
				>
					<hr
						className={`${
							currentTime === '0%' ? 'border-zinc-700' : 'border-green-500'
						} border-4 rounded-bl-md z-10 duration-1000`}
						style={{
							width: currentTime,
							// transition: 'width .5s',
						}}
					/>
					<hr
						className={`${
							currentTime === '100%' ? 'border-green-500' : 'border-zinc-700'
						} z-10 flex-1 border-4 rounded-br-md`}
					/>
				</div>
			</div>
		</div>
	);
};

export default PlayImage;
