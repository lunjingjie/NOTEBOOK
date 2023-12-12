import { Switch } from 'antd';
import { Icon } from '../Icon';
import { useDispatch } from 'react-redux';
import { setTheme } from '../../../store/systemSlice';

export const ThemeSwitch: React.FC = () => {
  const dispatch = useDispatch();

	const changeMode = (checked: boolean) => {
		if (checked) {
			dispatch(setTheme('dark'));
			return;
		}
		dispatch(setTheme('light'));
	};

	return (
		<div>
			<Switch
				checkedChildren={<Icon icon="mdi-weather-night" size={20} />}
				unCheckedChildren={<Icon icon="mdi-weather-sunny" size={20} />}
				onChange={changeMode}
			/>
		</div>
	);
};
