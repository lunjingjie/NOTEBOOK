import { Antd5Editor } from 'pages/LowCode/react-shells/ant5';
import { memo, useMemo, useState } from 'react';
import { pages } from './data';
import { toolsLocales } from './locales';

// 枚举左侧nav类型
export enum LeftNavType {
	page = 'page',
	component = 'component',
	outline = 'outline',
	history = 'history'
}

export const Antd5Example = memo(() => {
	const [pageId, setPageId] = useState('dashboard');

	// 获取当前所选的pageId对应的json
	const schemas = useMemo(() => {
		// 获取any类型的pages对象的pageId属性对应的值
		return (pages as any)[pageId];
	}, [pageId]);

	return (
		<Antd5Editor
			schemas={schemas}
			canvasUrl="/canvas-render"
			previewUrl="preview-render"
      themeMode='dark'
      navPanel={<></>}
      topBar={<></>}
      locales={toolsLocales}
      leftNav={<></>}
		></Antd5Editor>
	);
});
