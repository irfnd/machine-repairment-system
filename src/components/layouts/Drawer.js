import { useStore } from '@/states';

import { Drawer as AntDrawer, Flex } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import MenuBar from '@/components/layouts/MenuBar';

function DrawerTitle() {
	const { setSidebar } = useStore();

	return (
		<Flex justify='flex-end'>
			<CloseOutlined style={{ fontSize: '20px', color: 'white' }} onClick={() => setSidebar({ openDrawer: false })} />
		</Flex>
	);
}

export default function Drawer() {
	const { sidebar, setSidebar } = useStore();

	return (
		<AntDrawer
			title={<DrawerTitle />}
			closeIcon={null}
			placement='left'
			open={sidebar.openDrawer}
			onClose={() => setSidebar({ openDrawer: false })}
			styles={{
				header: { backgroundColor: '#001529', padding: '15px 20px' },
				body: { backgroundColor: '#001529', padding: '15px 0' },
			}}
		>
			<MenuBar />
		</AntDrawer>
	);
}
