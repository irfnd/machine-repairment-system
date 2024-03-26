import * as React from 'react';

import { Avatar, Button, Flex, Dropdown, Typography } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';

export default function UsersAvatar() {
	const userMenu = React.useMemo(() => [{ key: '/logout', label: 'Keluar', icon: <LogoutOutlined />, danger: true }], []);

	const onClickMenu = (menu) => console.log(menu);

	return (
		<Flex align='center' gap='10px' style={{ paddingRight: '20px' }}>
			<Flex vertical align='flex-end'>
				<Typography.Text style={{ fontWeight: 700, lineHeight: 1 }}>Seto Dwi Laksono</Typography.Text>
				<Typography.Text italic>Produksi</Typography.Text>
			</Flex>
			<Dropdown menu={{ items: userMenu, onClick: onClickMenu }} trigger={['click']}>
				<Button type='text' shape='circle' style={{ padding: 0, width: 'fit-content', height: 'fit-content' }}>
					<Avatar size='large' icon={<UserOutlined />} />
				</Button>
			</Dropdown>
		</Flex>
	);
}
