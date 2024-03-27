import { auth } from '@/utils/auth';

import { Flex } from 'antd';
import Layout from '@/components/layouts';
import SessionProvider from '@/components/providers/SessionProvider';
import DataMesinTable from '@/components/pages/data-mesin/DataMesinTable';

export default async function DataMesin() {
	const session = await auth();

	return (
		<SessionProvider session={session}>
			<Layout>
				<Flex vertical gap={20}>
					<h2 style={{ margin: 0 }}>Data Mesin</h2>
					<DataMesinTable />
				</Flex>
			</Layout>
		</SessionProvider>
	);
}
