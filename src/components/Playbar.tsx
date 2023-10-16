interface PlaybarProps {
	preview: string;
}

const Playbar = ({ preview }: PlaybarProps) => {
	return (
		<audio
			controls
			src={preview}
			color='black'
			className='mx-auto my-2 h-8 w-full sm:w-3/4 rounded-md'
		/>
	);
};

export default Playbar;
