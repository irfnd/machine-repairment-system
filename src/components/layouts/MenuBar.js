import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Menu } from 'antd';
import { SettingOutlined, ToolOutlined, UserOutlined } from '@ant-design/icons';

export default function MenuBar() {
	const pathname = usePathname();

	const selectedKey = React.useMemo(() => `${pathname === '/' ? '/data-mesin' : pathname}`, [pathname]);
	const menuList = React.useMemo(
		() => [
			{
				key: '/data-mesin',
				icon: <SettingOutlined />,
				label: <Link href='/data-mesin'>Data Mesin</Link>,
			},
			{
				key: '/data-kerusakan',
				icon: <ToolOutlined />,
				label: <Link href='/data-kerusakan'>Data Kerusakan</Link>,
			},
			{
				key: '/biodata',
				icon: <UserOutlined />,
				label: <Link href='/biodata'>Biodata</Link>,
			},
		],
		[]
	);

	return <Menu theme='dark' mode='inline' selectedKeys={[selectedKey]} items={menuList} style={{ paddingInline: '15px' }} />;
}
