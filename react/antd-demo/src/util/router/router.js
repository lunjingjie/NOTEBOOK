import { createHashRouter } from 'react-router-dom';
import BasicManage from '../../pages/basicManage/BasicManage';

export const routerList = [
	{
		path: '/basicManage',
		element: <BasicManage />,
    name: '管理',
	},
];

export const router = createHashRouter(routerList);