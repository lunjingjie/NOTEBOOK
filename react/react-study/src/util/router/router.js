import { createHashRouter } from 'react-router-dom';
import Jsx from '../../pages/Jsx';

const routerList = [
	{
		path: '/jsx',
		element: <Jsx />
	}
];

export const router = createHashRouter(routerList);