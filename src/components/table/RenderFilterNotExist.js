import * as React from 'react';
import { parseDate, parseCurrency, parseNumber } from '@/utils/parse';

export default function RenderFilterNotExist(props) {
	const { fieldType, flagFields, dataIndex, value } = props;

	if (fieldType === 'date') return parseDate(value, true)?.format('DD-MM-YYYY') || `${value || '-'}`;
	if (fieldType === 'currency') return parseCurrency(value)?.formatted || `${value || '-'}`;
	if (fieldType === 'numeric') return parseNumber(value) || `${value || '-'}`;
	if (fieldType === 'flag') return React.cloneElement(flagFields[dataIndex].component, { value });
	return `${value || '-'}`;
}
