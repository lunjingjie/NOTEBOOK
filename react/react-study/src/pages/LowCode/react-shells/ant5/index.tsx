import React, { memo } from 'react';
import { ILocales } from '../../core/interfaces/loacales';
import { INodeSchema } from '../../core/interfaces/document';

// 定义props
export type Antd5EditorProps = {
	leftNav?: React.ReactNode;
	topBar?: React.ReactNode;
	navPanel?: React.ReactNode;
	themeMode?: 'dark' | 'light';
	children?: React.ReactNode;
	locales: ILocales;
  schemas: INodeSchema,
  canvasUrl: string,
  previewUrl: string,
};

export const Antd5Editor = memo((props: Antd5EditorProps) => {
	return <div>Antd5Editor</div>;
});
