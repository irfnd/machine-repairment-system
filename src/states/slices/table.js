export const tableSlice = (set) => ({
	table: {
		filter: {},
		inputValue: '',
		inputRef: { current: null },
		pagination: { current: 1, pageSize: 10 },
	},
	setTable: (newData) => set(({ table }) => ({ table: { ...table, ...newData } })),
});
