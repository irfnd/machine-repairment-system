import { auth } from '@/utils/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
	const session = await auth();

	if (session?.user?.role === 'supervisior') redirect('/mesin');
	if (session?.user?.role === 'produksi') redirect('/mesin');
	return redirect('/kerusakan');
}
