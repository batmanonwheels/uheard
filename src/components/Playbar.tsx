interface PlaybarProps {
	preview: string;
}

const Playbar = ({ preview }: PlaybarProps) => {
	return (
		<audio
			controls
			src={preview}
			color='black'
			className='mx-auto my-4 h-8 z-10 bg-white w-full sm:w-3/4 rounded-md'
		/>
	);
};

export default Playbar;
