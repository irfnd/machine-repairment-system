import { auth } from '@/utils/auth';

import { Flex, Button } from 'antd';
import Layout from '@/components/layouts';
import SessionProvider from '@/components/providers/SessionProvider';
import DataMesinTable from '@/components/pages/data-mesin/DataMesinTable';

export const metadata = {
	title: 'Mesin',
	description: 'List Data Mesin',
};

export default async function DataMesin() {
	const session = await auth();

	return (
		<SessionProvider session={session}>
			<Layout>
				<Flex vertical gap={20}>
					<h2 style={{ margin: 0 }}>Data Mesin</h2>
					<Flex>
						<Button>Tambah Baru</Button>
					</Flex>
					<DataMesinTable />
				</Flex>
			</Layout>
		</SessionProvider>
	);
}
