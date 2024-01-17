'use client';

interface RateProps {
	trackRecommendationId?: number;
	albumRecommendationId?: number;
	rating: string[];
	setRating: React.Dispatch<React.SetStateAction<string[]>>;
}

const Rate = ({
	trackRecommendationId,
	albumRecommendationId,
	rating,
	setRating,
}: RateProps) => {
	const emptyStar: string = '○';
	const halfStar: string = '◐';
	const fullStar: string = '●';

	const handleRate = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
		let newRating = ['○', '○', '○', '○', '○'];

		const modal = document.querySelector('.modal:not(.hidden)');
		if (!modal) return;

		const stars = modal.querySelector('div#stars');
		if (!stars) return;

		const starWidth = e.currentTarget.getBoundingClientRect().width;
		const halfStarWidth = starWidth / 2;
		const mouseXPos = e.nativeEvent.offsetX;

		for (let i = 0; i < 5; i++) {
			if (parseInt(e.currentTarget.className) - 1 > i) {
				newRating[i] = fullStar;
			}

			if (parseInt(e.currentTarget.className) - 1 === i) {
				if (mouseXPos <= halfStarWidth) {
					newRating[i] = halfStar;
				} else {
					newRating[i] = fullStar;
				}
			}

			if (parseInt(e.currentTarget.className) - 1 < i) {
				newRating[i] = emptyStar;
			}
		}
		setRating(newRating);
	};

	return (
		<div
			className='rating flex justify-evenly gap-3 text-green-500 text-4xl w-3/4 text-center mx-1'
			id='stars'
		>
			{rating.map((star, i) => (
				<span
					id={`rate-${trackRecommendationId ? 'track' : 'album'}-star-${
						trackRecommendationId
							? trackRecommendationId
							: albumRecommendationId
					}`}
					className={i + 1 + ''}
					key={i + 1}
					onClick={(e) => handleRate(e)}
				>
					{star}
				</span>
			))}
		</div>
	);
};

export default Rate;
