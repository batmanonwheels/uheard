interface TrackProgressBarProps {
	percentComplete: string;
}

const TrackProgressBar = ({ percentComplete }: TrackProgressBarProps) => {
	return (
		<div className='flex flex-row w-3/4'>
			<hr className={'border-green-300'} style={{ width: percentComplete }} />
			<hr className='flex-1 border-zinc-700' />
		</div>
	);
};

export default TrackProgressBar;
