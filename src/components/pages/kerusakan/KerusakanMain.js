'use client';

import KerusakanDeleteModal from '@/components/pages/kerusakan/KerusakanDeleteModal';
import KerusakanDetailModal from '@/components/pages/kerusakan/KerusakanDetailModal';
import KerusakanFormModal from '@/components/pages/kerusakan/KerusakanFormModal';
import KerusakanTable from '@/components/pages/kerusakan/KerusakanTable';
import { Flex } from 'antd';

export default function KerusakanMain() {
	return (
		<Flex vertical gap={20}>
			{/* Page Title */}
			<h2 style={{ margin: 0 }}>Laporan Kerusakan Mesin</h2>

			{/* Table */}
			<KerusakanTable />

			{/* Modals */}
			<KerusakanFormModal />
			<KerusakanDetailModal />
			<KerusakanDeleteModal />
		</Flex>
	);
}
