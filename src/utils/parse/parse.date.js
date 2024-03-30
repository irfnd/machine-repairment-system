import dayjs from 'dayjs';

dayjs.locale('id');

function getDate(date) {
	if (date?.toString()?.includes(' ')) return date?.toString()?.split(' ')[0];
	if (date?.toString()?.includes('T')) return date?.toString()?.split('T')[0];
	return date;
}

export function parseDate(date, withInstance = false) {
	const inDate = getDate(date);
	if (dayjs(inDate, ['MM-DD-YYYY', 'YYYY-MM-DD']).isValid()) {
		if (withInstance) return dayjs(inDate, ['MM-DD-YYYY', 'YYYY-MM-DD']);
		return dayjs(inDate, ['MM-DD-YYYY', 'YYYY-MM-DD']).toISOString().split('+')[0] + 'Z';
	}
	return null;
}
