'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { loginAction } from '@/actions';

import { Flex, Card, Form, Input, Button, Grid, notification, theme } from 'antd';
import { LockOutlined, UserOutlined, LoginOutlined } from '@ant-design/icons';

export default function Login() {
	const [submitLoading, setSubmitLoading] = React.useState(false);
	const [api, contextHolder] = notification.useNotification();
	const { token } = theme.useToken();
	const { xs } = Grid.useBreakpoint();
	const router = useRouter();

	const onLogin = async (values) => {
		try {
			setSubmitLoading(true);
			await loginAction(values);
			api.success({ message: 'Berhasil Masuk', description: 'Selamat Datang Kembali!' });
			setSubmitLoading(false);
			setTimeout(() => router.replace('/data-mesin'), 500);
		} catch (err) {
			if (err instanceof Error) api.error({ message: 'Gagal Masuk', description: err.message });
			setSubmitLoading(false);
		}
	};

	return (
		<>
			<Flex justify='center' align='center' style={{ backgroundColor: '#001529', minHeight: '100vh' }}>
				<Card bordered={false} style={{ width: 350, margin: xs ? 15 : 0 }}>
					<Flex vertical gap={25}>
						<Flex vertical style={{ textAlign: 'center' }}>
							<h2 style={{ margin: 0 }}>Machine Management</h2>
							<span style={{ color: token.colorTextDescription }}>Silahkan masuk untuk melanjutkan</span>
						</Flex>

						<Form onFinish={onLogin}>
							<Form.Item name='emailOrUsername' rules={[{ required: true, message: 'Harap masukan Email/Username Anda!' }]}>
								<Input prefix={<UserOutlined />} size='large' placeholder='Email/Username' />
							</Form.Item>
							<Form.Item name='password' rules={[{ required: true, message: 'Harap masukan Password Anda!' }]}>
								<Input prefix={<LockOutlined />} type='password' size='large' placeholder='Password' />
							</Form.Item>
							<Form.Item style={{ marginBottom: 10 }}>
								<Flex justify='flex-end' style={{ marginTop: 10 }}>
									<Button
										type='primary'
										htmlType='submit'
										icon={<LoginOutlined />}
										size='large'
										loading={submitLoading}
										block
									>
										Masuk
									</Button>
								</Flex>
							</Form.Item>
						</Form>
					</Flex>
				</Card>
			</Flex>
			{contextHolder}
		</>
	);
}
