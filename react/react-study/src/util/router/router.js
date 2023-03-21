import { createHashRouter } from 'react-router-dom';
import Jsx from '../../pages/Jsx';
import Component from '../../pages/Component';
import State from '../../pages/State';
import Props from '../../pages/Props';
import LifeCycle from '../../pages/LifeCycle';
import Ref from '../../pages/Ref';
import Context from '../../pages/Context';
import Hoc from '../../pages/Hoc';
import RenderControl from '../../pages/RenderControl';
import FileTest from '../../pages/FileTest';
import LowCode from '../../pages/LowCode';
import WebRtc from '../../pages/WebRtc';

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
  {
		path: '/hoc',
		element: <Hoc />,
    name: 'Hoc',
	},
  {
		path: '/renderControl',
		element: <RenderControl />,
    name: 'RenderControl',
	},
  {
		path: '/fileTest',
		element: <FileTest />,
    name: 'FileTest',
	},
  {
		path: '/lowCode',
		element: <LowCode />,
    name: 'LowCode',
	},
  {
		path: '/webRtc',
		element: <WebRtc />,
    name: 'WebRtc',
	},
];

export const router = createHashRouter(routerList);