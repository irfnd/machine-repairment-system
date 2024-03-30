import { Tag } from 'antd';

export default function KategoriMesinTags(props) {
	const { value, kategoriList = undefined } = props;
	const tagList = kategoriList?.reduce((acc, curr) => ({ ...acc, [curr.id]: <Tag>{curr.categoryName}</Tag> }), {});
	return tagList && value ? tagList[value] : '-';
}
