import { createHashRouter } from 'react-router-dom';
import Jsx from '../../pages/Jsx';
import Component from '../../pages/Component';
import State from '../../pages/State';

export const routerList = [
	{
		path: '/jsx',
		element: <Jsx />,
    name: 'JSX学习',
	},
  {
		path: '/component',
		element: <Component />,
    name: 'component学习',
	},
  {
		path: '/state',
		element: <State />,
    name: 'state学习',
	},
];

export const router = createHashRouter(routerList);