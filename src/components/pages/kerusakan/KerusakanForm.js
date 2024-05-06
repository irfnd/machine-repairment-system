import { addKerusakan, getKerusakanById, updateKerusakan } from '@/requests';
import { useStore } from '@/states';
import { parseDate, parseFormData } from '@/utils/parse';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as React from 'react';

import KerusakanFormSelectMesin from '@/components/pages/kerusakan/KerusakanFormSelectMesin';
import { CheckOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Flex, Form, Input, notification } from 'antd';

export default function KerusakanForm({ form, onCancel }) {
	const [submitLoading, setSubmitLoading] = React.useState(false);

	const [notif, notifContext] = notification.useNotification();
	const { kerusakan, setKerusakan } = useStore();
	const queryClient = useQueryClient();

	const isGetKerusakanById = React.useMemo(() => {
		const { formType, selectedData } = kerusakan;
		return formType === 'update' && selectedData && !selectedData.machine;
	}, [kerusakan]);

	const kerusakanById = useQuery({
		queryKey: ['kerusakan', kerusakan?.selectedData?.id],
		queryFn: async () => {
			try {
				const { selectedData } = kerusakan;
				const data = await getKerusakanById(selectedData?.id);
				const { id, repairmentDate, description, machine } = data;
				const fieldData = { machineId: machine.machineId, repairmentDate: parseDate(repairmentDate, true) };
				setKerusakan({ selectedData: data });
				form.setFieldsValue({ id, description, ...fieldData });
			} catch (err) {
				notif.error({ message: `Gagal Mengambil Data`, description: err.message });
				throw new Error(err);
			}
		},
		enabled: !!isGetKerusakanById,
	});

	const queryMutation = useMutation({
		mutationFn: kerusakan.formType === 'add' ? addKerusakan : updateKerusakan,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['kerusakan'] });
			const aksiMsg = kerusakan.formType === 'add' ? 'Ditambahkan' : 'Diperbarui';
			notif.success({ message: `Berhasil ${aksiMsg}`, description: `Data Laporan Kerusakan Berhasil ${aksiMsg}` });
			setSubmitLoading(false);
			onCancel();
		},
		onError: (err) => {
			const aksiMsg = kerusakan.formType === 'add' ? 'Ditambahkan' : 'Diperbarui';
			notif.error({ message: `Gagal ${aksiMsg}`, description: err.message });
			setSubmitLoading(false);
		},
	});

	const btnOk = React.useMemo(() => {
		if (kerusakan.formType === 'add') return { text: 'Tambah', icon: <PlusOutlined /> };
		return { text: 'Simpan', icon: <CheckOutlined /> };
	}, [kerusakan.formType]);

	const onSubmit = (value) => {
		setSubmitLoading(true);
		if (kerusakan.formType === 'add') {
			const parsedData = parseFormData(value, { datePicker: ['repairmentDate'] });
			queryMutation.mutate(parsedData);
		} else {
			const { id, repairmentDate, description, machine } = kerusakan.selectedData;
			const dataBefore = { id, repairmentDate: parseDate(repairmentDate, true), description, machineId: machine.machineId };
			const checkData = _.isEqual(dataBefore, value);
			console.log(dataBefore, value, checkData);
			if (!checkData) {
				const { id: _id, ...others } = value;
				const parsedData = parseFormData(others, { datePicker: ['repairmentDate'] });
				queryMutation.mutate({ id, newData: parsedData });
			} else {
				notif.info({ message: 'Tidak ada perubahan', description: 'Data Laporan Kerusakan Tidak Berubah' });
				setSubmitLoading(false);
				onCancel();
			}
		}
	};

	return (
		<Form form={form} layout='vertical' onFinish={onSubmit}>
			{/* Hidden Fields */}
			<Form.Item name='id' hidden>
				<Input />
			</Form.Item>

			{/* Machine */}
			<KerusakanFormSelectMesin loading={kerusakanById.isLoading} disabled={submitLoading || kerusakanById.isLoading} />

			{/* Repairment Date */}
			<Form.Item
				name='repairmentDate'
				label='Tanggal Kerusakan'
				rules={[{ type: 'object', required: true, message: 'Harap pilih tanggal kerusakan' }]}
				validateStatus={kerusakanById.isLoading ? 'validating' : ''}
				hasFeedback
			>
				<DatePicker
					format='DD-MM-YYYY'
					placeholder='Masukan tanggal kerusakan'
					style={{ width: '100%' }}
					disabled={submitLoading || kerusakanById.isLoading}
					allowClear
				/>
			</Form.Item>

			{/* Description */}
			<Form.Item
				name='description'
				label='Keterangan'
				rules={[{ required: true, message: 'Harap masukan keterangan' }]}
				validateStatus={kerusakanById.isLoading ? 'validating' : ''}
				hasFeedback
			>
				<Input.TextArea
					placeholder='Masukkan keterangan'
					rows={3}
					disabled={submitLoading || kerusakanById.isLoading}
					allowClear
				/>
			</Form.Item>

			{/* Button Action */}
			<Form.Item style={{ marginBottom: 10 }}>
				<Flex justify='flex-end' gap={10}>
					<Button
						type='primary'
						htmlType='submit'
						size='large'
						icon={btnOk.icon}
						loading={submitLoading || kerusakanById.isLoading}
					>
						{btnOk.text}
					</Button>
					<Button
						size='large'
						icon={<CloseOutlined />}
						onClick={onCancel}
						loading={submitLoading || kerusakanById.isLoading}
					>
						Batal
					</Button>
				</Flex>
			</Form.Item>

			{notifContext}
		</Form>
	);
}
