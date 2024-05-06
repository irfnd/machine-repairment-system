export const tableSlice = (set) => ({
	table: {
		filter: {},
		localFilter: {},
		inputValue: '',
		inputRef: { current: null },
		pagination: { current: 1, pageSize: 10, total: 0 },
	},
	setTable: (newData) => set(({ table }) => ({ table: { ...table, ...newData } })),
});
