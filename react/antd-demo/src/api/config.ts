import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api/wdp-data',
});

axiosInstance.defaults.headers.Authorization =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3ZHAzIiwidXNlcklkIjoiNGYzOTE3NWU3NGYzMDQ4Njg2YzdlMjc4MGZkNjc1YzYiLCJ0ZW5hbnRJZCI6IjRmMmMzOTNmNzk2MWI3YmNkMDU2YTgyMzhiN2MxYzE4Iiwicm9sZUlkcyI6WyJmM2E1MGM4NWIyY2U5ODU0YzBhOTk2NjNhMzBlZmNiZCJdLCJvZmZpY2VJZCI6ImViMmJkOGM2NTAyMGJmYzYwNzE5MDM5MmQ3ZDQyZjJhIiwib2ZmaWNlVHlwZSI6IjIiLCJpYXQiOjE2OTQ3MzYyODMsImV4cCI6MTY5NTM0MTA4M30.ClXXcQEkavlAD3QrMdDbxJ6xfdN0Vz01L77feTHA_5o';

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log(err, '网络错误');
  },
);

export default axiosInstance;
