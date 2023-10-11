'use client';

import { useState } from 'react';

interface TrackProgressBarProps {
	percentComplete: string;
}

const TrackProgressBar = ({ percentComplete }: TrackProgressBarProps) => {
	const [width, setWidth] = useState<string>(percentComplete);
	if (width !== percentComplete) setWidth(percentComplete);

	const hrClass = 'border-green-300 ' + percentComplete;

	return (
		<div className='flex flex-row w-3/4'>
			<hr className={hrClass} style={{ width: percentComplete }} />
			<hr className='flex-1 border-zinc-700' />
		</div>
	);
};

export default TrackProgressBar;
