import roles from '@/roles';
import { auth } from '@/utils/auth';

import Layout from '@/components/layouts';
import SessionProvider from '@/components/providers/SessionProvider';
import MesinMain from '@/components/pages/mesin/MesinMain';

export const metadata = {
	title: 'Mesin',
	description: 'List Data Mesin',
};

export default async function Mesin() {
	const session = await auth();

	return (
		<SessionProvider session={session}>
			<Layout>
				<MesinMain />
			</Layout>
		</SessionProvider>
	);
}
