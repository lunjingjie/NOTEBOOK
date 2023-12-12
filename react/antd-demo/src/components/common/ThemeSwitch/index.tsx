import { Switch } from 'antd';
import { Icon } from '../Icon';
import { useThemeSwitch } from '../../../hooks/web';

export const ThemeSwitch: React.FC = () => {
	const { setTheme } = useThemeSwitch();

	const changeMode = (checked: boolean) => {
		if (checked) {
			setTheme('dark');
			return;
		}
		setTheme('light');
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
