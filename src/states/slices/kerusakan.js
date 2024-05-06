export const kerusakanSlice = (set) => ({
	kerusakan: {
		selectedData: null,
		modalAddVisible: false,
		modalShowVisible: false,
		modalUpdateVisible: false,
		modalDeleteVisible: false,
		formType: 'add',
	},
	setKerusakan: (newData) => set(({ kerusakan }) => ({ kerusakan: { ...kerusakan, ...newData } })),
});
