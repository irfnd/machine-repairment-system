export const mesinSlice = (set) => ({
	mesin: {
		kategori: [],
		selectedData: null,
		searchRef: null,
		modalAddVisible: false,
		modalShowVisible: false,
		modalUpdateVisible: false,
		modalDeleteVisible: false,
		formType: 'add',
	},
	setMesin: (newData) => set(({ mesin }) => ({ mesin: { ...mesin, ...newData } })),
});
