'use client';

import * as React from 'react';
import { useStore } from '@/states';

import { Layout as AntLayout, Button, Flex, theme } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import Drawer from '@/components/layouts/Drawer';
import MenuBar from '@/components/layouts/MenuBar';
import UserAvatar from '@/components/layouts/UserAvatar';

export default function Layout({ children }) {
	const { sidebar, setSidebar } = useStore();
	const { token } = theme.useToken();

	const onClickHumburger = () => {
		if (!sidebar.isDrawer) setSidebar({ collapsed: !sidebar.collapsed });
		else setSidebar({ openDrawer: !sidebar.openDrawer });
	};
	const onBreakpointSider = (breakpoint) => {
		setSidebar({ isDrawer: breakpoint, openDrawer: false, collapsed: breakpoint });
	};

	return (
		<AntLayout style={{ minHeight: '100vh' }}>
			<AntLayout.Sider
				breakpoint='lg'
				collapsedWidth={sidebar.isDrawer ? '0' : '85'}
				onBreakpoint={onBreakpointSider}
				trigger={null}
				width={300}
				collapsed={sidebar.collapsed}
				collapsible
			>
				<div style={{ width: '100%', height: '40px', margin: '10px auto 20px' }} />
				<MenuBar />
			</AntLayout.Sider>
			<Drawer />
			<AntLayout>
				<AntLayout.Header style={{ padding: '0', background: token.colorBgContainer }}>
					<Flex align='center' justify='space-between'>
						<Button
							type='text'
							icon={<MenuOutlined />}
							onClick={onClickHumburger}
							style={{ fontSize: '16px', width: 64, height: 64 }}
						/>
						<UserAvatar />
					</Flex>
				</AntLayout.Header>
				<AntLayout.Content
					style={{
						margin: '24px 16px',
						padding: 24,
						minHeight: 280,
						background: token.colorBgContainer,
						borderRadius: token.borderRadiusLG,
					}}
				>
					{children}
				</AntLayout.Content>
			</AntLayout>
		</AntLayout>
	);
}
