import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { PermissionHoc } from './PermissionHoc';

export const Permission = React.createContext([]);

const Article = PermissionHoc('article')(() => {
  return <Button color="primary">article</Button>;
});

const List = PermissionHoc('list')(() => {
  return <Button color="primary">list</Button>;
});

const Tag = PermissionHoc('tag')(() => {
  return <Button color="primary">Tag</Button>;
});

export default function Index() {
	const [rootPermission, setRootPermission] = useState([]);
	useEffect(() => {
		setRootPermission(['tag', 'article']);
	}, []);
	return (
		<Permission.Provider value={rootPermission}>
			<Article></Article>
      <List></List>
      <Tag></Tag>
		</Permission.Provider>
	);
}
