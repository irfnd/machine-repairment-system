import { auth } from '@/utils/auth';

import { Flex } from 'antd';
import Layout from '@/components/layouts';
import SessionProvider from '@/components/providers/SessionProvider';
import BiodataDetail from '@/components/pages/biodata/BiodataDetail';

export const metadata = {
	title: 'Biodata',
	description: 'Halaman Biodata',
};

export default async function Biodata() {
	const session = await auth();

	return (
		<SessionProvider session={session}>
			<Layout>
				<Flex vertical gap={20}>
					<h2 style={{ margin: 0 }}>Biodata</h2>
					<BiodataDetail />
				</Flex>
			</Layout>
		</SessionProvider>
	);
}
