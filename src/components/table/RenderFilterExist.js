import * as React from 'react';
import { useStore } from '@/states';
import { parseDate, parseCurrency, parseNumber } from '@/utils/parse';

import SearchHighlighter from '@/components/table/SearchHighlighter';

export default function RenderFilterExist(props) {
	const { fieldType, flagFields, dataIndex, value } = props;
	const { table } = useStore();
	const { filter } = table;

	if (fieldType === 'date') {
		const text = parseDate(value, true)?.format('DD-MM-YYYY') || `${value || '-'}`;
		const searchedWord = parseDate(filter[dataIndex], true)?.format('DD-MM-YYYY') || `${filter[dataIndex] || '-'}`;
		return <SearchHighlighter text={text} searchWords={searchedWord} />;
	}
	if (fieldType === 'currency') {
		const text = parseCurrency(value) || `${value || '-'}`;
		const searchedWord = parseNumber(filter[dataIndex]) || `${filter[dataIndex] || '-'}`;
		return <SearchHighlighter text={text} searchWords={searchedWord} />;
	}
	if (fieldType === 'numeric') {
		const text = parseNumber(value) || `${value || '-'}`;
		const searchedWord = parseNumber(filter[dataIndex]) || `${filter[dataIndex] || '-'}`;
		return <SearchHighlighter text={text} searchWords={searchedWord} />;
	}
	if (fieldType === 'flag') {
		return React.cloneElement(flagFields[dataIndex].component, { value });
	}
	return <SearchHighlighter text={`${value || '-'}`} searchWords={filter[dataIndex] || '-'} />;
}
