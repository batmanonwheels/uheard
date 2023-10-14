export const getDate = async (timestamp: string) => {
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
	return `${months[parseInt(timestamp.split('-')[1]) - 1]} ${parseInt(
		timestamp.split('-')[2]
	)}, ${timestamp.split('-')[0]}`;
};
