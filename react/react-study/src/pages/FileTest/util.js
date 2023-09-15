import { axiosInstance } from '../../api/config';

/**
 * 获取文件长度
 * @param {string} url 请求路径
 */
export const getContentLength = async (url) => {
	const res = await axiosInstance.head(url);
	return 10000;
};

/**
 * 实现异步任务的并发控制
 * @param {*} poolLimit 限制并发数
 * @param {*} array 任务数组
 * @param {*} iteratorFn 迭代函数，对每个任务进行处理
 * @returns
 */
export const asyncPool = async (poolLimit, array, iteratorFn) => {
	const ret = [];
	const executing = [];
	for (const item of array) {
		const p = Promise.resolve().then(() => iteratorFn(item, array));
		ret.push(p);

		if (poolLimit <= array.length) {
			const e = p.then(() => executing.splice(executing.indexOf(e), 1));
			executing.push(e);
			if (executing.length >= poolLimit) {
				await Promise.race(executing);
			}
		}
	}
	return Promise.all(ret);
};

/**
 * 获取下载指定范围内的文件数据块
 * @param {*} url
 * @param {*} start
 * @param {*} end
 * @param {*} i
 */
export const getBinaryContent = async (url, start, end, i) => {
	const res = await axiosInstance(url, {
    methods: 'get',
		headers: {
			range: `bytes=${start}-${end}`
		},
		responseType: 'blob'
	});
  return {
    index: i, // 文件块的索引
    buffer: res, // 范围请求对应的数据
  }
};

/**
 * 把 ArrayBuffer 对象转换为 Uint8Array 对象，合并数据块
 * @param {*} arrays
 * @returns
 */
export const concatenate = (arrays) => {
	if (!arrays.length) {
		return null;
	}
	let totalLength = arrays.reduce((acc, value) => acc + value.length, 0);
	let result = new Uint8Array(totalLength);
	let length = 0;
	for (let array of arrays) {
		result.set(array, length);
		length += array.length;
	}
	return result;
};

export const saveAs = ({ name, buffers, mime = 'application/octet-stream' }) => {
	const blob = new Blob([buffers], { type: mime });
	const blobUrl = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.download = name || Math.random();
	a.href = blobUrl;
	a.click();
	URL.revokeObjectURL(blob);
};

export const download = async ({ url, chunkSize, poolLimit = 1 }) => {
	const contentLength = await getContentLength(url);
	const chunks = typeof chunkSize === 'number' ? Math.ceil(contentLength / chunkSize) : 1;
	const results = await asyncPool(poolLimit, [...new Array(chunks).keys()], (i) => {
		let start = i * chunkSize;
		let end = i + 1 === chunks ? contentLength - 1 : (i + 1) * chunkSize - 1;
		return getBinaryContent(url, start, end, i);
	});
	const sortedBuffers = results.map((item) => new Uint8Array(item.buffer));
	return concatenate(sortedBuffers);
};
