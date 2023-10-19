export const getDate = async (timestamp: string, precision: string) => {
	const months: string[] = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	if (precision === 'year') return `Released in ${timestamp}`;
	return `Released on ${
		months[parseInt(timestamp.split('-')[1]) - 1]
	} ${parseInt(timestamp.split('-')[2])}, ${timestamp.split('-')[0]}`;
};
