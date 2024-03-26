import { create } from 'zustand';
import * as slices from '@/states/slices';

export const useStore = create()((...a) => ({
	...slices.sidebarSlice(...a),
	...slices.tableSlice(...a),
}));
