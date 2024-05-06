import { create } from 'zustand';
import * as slices from '@/states/slices';

export const useStore = create()((...a) => ({
	...slices.sidebarSlice(...a),
	...slices.tableSlice(...a),
	...slices.kategoriSlice(...a),
	...slices.mesinSlice(...a),
	...slices.kerusakanSlice(...a),
	...slices.biodataSlice(...a),
}));
