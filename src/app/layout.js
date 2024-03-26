import { Inter } from 'next/font/google';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import { theme } from '@/themes';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Machine Management',
	description: 'Machine Management System',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={inter.className} style={{ minHeight: '100vh', padding: 0, margin: 0 }}>
				<AntdRegistry>
					<ConfigProvider theme={theme}>{children}</ConfigProvider>
				</AntdRegistry>
			</body>
		</html>
	);
}
