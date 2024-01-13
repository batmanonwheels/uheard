'use client';

import { useState } from 'react';

interface TrackProgressBarProps {
	// percentComplete: string;
	pos: number;
	length: number;
	playing: boolean;
}

const TrackProgressBar = ({
	// percentComplete,
	pos,
	length,
	playing,
}: TrackProgressBarProps) => {
	const [newPos, setNewPos] = useState<number>(pos);

	const percentComplete =
		Math.round((newPos / length) * 100) >= 100
			? 100
			: Math.round((newPos / length) * 100) + '% ';

	setTimeout(() => playing && setNewPos(newPos + 1000), 1000);

	return (
		<div className='w-3/4 relative'>
			<hr className='w-full border-zinc-700 z-[10]' />
			<hr
				className={'absolute border-green-300 z-[11] top-0'}
				style={{ width: percentComplete }}
			/>
		</div>
	);
};

export default TrackProgressBar;
