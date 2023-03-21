import React from 'react';
import { Button } from 'antd';
import { download, saveAs } from './util';

const FileTest = () => {
	const downloadFile = () => {
		download({
			url: '',
			chunkSize: 1024 * 1024 * 0.1,
			poolLimit: 6
		}).then((buffers) => {
      console.log(buffers);
			saveAs({
				buffers,
				name: '压缩包',
				mime: 'application/zip'
			});
		});
	};

	return (
		<div>
			<Button onClick={downloadFile}>点击下载</Button>
		</div>
	);
};

export default React.memo(FileTest);
