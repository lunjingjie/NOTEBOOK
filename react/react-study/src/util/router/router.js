import { createHashRouter } from 'react-router-dom';
import Jsx from '../../pages/Jsx';
import Component from '../../pages/Component';
import State from '../../pages/State';
import Props from '../../pages/Props';
import LifeCycle from '../../pages/LifeCycle';
import Ref from '../../pages/Ref';
import Context from '../../pages/Context';

export const routerList = [
	{
		path: '/jsx',
		element: <Jsx />,
    name: 'JSX',
	},
  {
		path: '/component',
		element: <Component />,
    name: 'component',
	},
  {
		path: '/state',
		element: <State />,
    name: 'state',
	},
  {
		path: '/props',
		element: <Props />,
    name: 'props',
	},
  {
		path: '/lifeCycle',
		element: <LifeCycle />,
    name: 'lifeCycle',
	},
  {
		path: '/ref',
		element: <Ref />,
    name: 'Ref',
	},
  {
		path: '/context',
		element: <Context />,
    name: 'Context',
	},
];

export const router = createHashRouter(routerList);