import dayjs from 'dayjs';

export function parseDate(date, withInstance = false) {
	if (date && dayjs(date).isValid()) {
		if (withInstance) return dayjs(date);
		return dayjs(date).format('YYYY-MM-DD');
	}
	return null;
}
