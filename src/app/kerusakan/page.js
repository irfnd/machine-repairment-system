import { auth } from '@/utils/auth';

import Layout from '@/components/layouts';
import SessionProvider from '@/components/providers/SessionProvider';
import KerusakanMain from '@/components/pages/kerusakan/KerusakanMain';

export const metadata = {
	title: 'Laporan Kerusakan Mesin',
	description: 'List Kerusakan Mesin',
};

export default async function Kerusakan() {
	const session = await auth();

	return (
		<SessionProvider session={session}>
			<Layout>
				<KerusakanMain />
			</Layout>
		</SessionProvider>
	);
}
