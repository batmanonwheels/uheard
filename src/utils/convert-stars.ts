export const convertStarsToNumber = async (
	stars: string[]
): Promise<number> => {
	let rating = 0;
	stars.map((star) => {
		switch (star) {
			case '○':
				rating += 0;
				break;
			case '◐':
				rating += 0.5;
				break;
			case '●':
				rating += 1;
				break;
		}
	});

	return rating;
};

export const convertNumberToStars = async (
	number: number
): Promise<string[]> => {
	const emptyStar: string = '○';
	const halfStar: string = '◐';
	const fullStar: string = '●';

	let rating = '';

	if (number % 1 === 0) {
		rating = fullStar.repeat(Math.floor(number));
		if (5 - number > 0) rating += emptyStar.repeat(5 - number);
	} else {
		rating = fullStar.repeat(Math.floor(number)) + halfStar;
		if (5 - number > 0) rating += emptyStar.repeat(5 - number - 0.5);
	}

	return rating.split('');
};
