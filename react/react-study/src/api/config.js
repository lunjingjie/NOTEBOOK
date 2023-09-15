import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'api'
});

axiosInstance.interceptors.response.use(
	(res) => res.data,
	(err) => {
		console.log(err, '网络错误');
	}
);

export { axiosInstance };
