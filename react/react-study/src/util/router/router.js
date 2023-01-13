import { createHashRouter } from 'react-router-dom';
import Jsx from '../../pages/Jsx';
import Component from '../../pages/Component';
import State from '../../pages/State';
import Props from '../../pages/Props';
import LifeCycle from '../../pages/LifeCycle';

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
  {
		path: '/props',
		element: <Props />,
    name: 'props学习',
	},
  {
		path: '/lifeCycle',
		element: <LifeCycle />,
    name: 'lifeCycle学习',
	},
];

export const router = createHashRouter(routerList);