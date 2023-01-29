import React, { useContext, useState } from 'react';
import { Radio } from 'antd';
import {
	HomeOutlined,
	SettingFilled,
	SmileOutlined,
	SyncOutlined,
	LoadingOutlined
} from '@ant-design/icons';

const ThemeContext = React.createContext(null);

const theme = {
	//主题颜色
	dark: { color: '#1890ff', background: '#1890ff', border: '1px solid blue', type: 'dark' },
	light: { color: '#fc4838', background: '#fc4838', border: '1px solid pink', type: 'light' }
};

/**
 * useContext模式
 */
function Input(props) {
	const { color, border } = useContext(ThemeContext);
	const { label, placeholder } = props;
	return (
		<div>
			<label style={{ color }}>{label}</label>
			<input style={{ border }} className="input" placeholder={placeholder}></input>
		</div>
	);
}

/**
 * Consumer模式
 */
function Box(props) {
	return (
		<ThemeContext.Consumer>
			{(themeContextValue) => {
				const { border, color } = themeContextValue;
				return (
					<div className="context_box" style={{ border, color }}>
						{props.children}
					</div>
				);
			}}
		</ThemeContext.Consumer>
	);
}

/**
 * contextType模式
 */
class App extends React.PureComponent {
	static contextType = ThemeContext;
	render() {
		const { border, setTheme, color, background } = this.context;
		return (
			<div style={{ border, color }}>
				<span>选择主题：</span>
				<Radio.Group onChange={(e) => setTheme(theme[e.target.value])} value="light">
					<Radio value="light">浅色</Radio>
					<Radio value="dark">深色</Radio>
				</Radio.Group>
				<div className="box_content">
					<Box>
						<Input label="姓名：" placeholder="请输入姓名" />
						<Input label="age：" placeholder="请输入年龄" />
						<button className="searchbtn" style={{ background }}>
							确定
						</button>
						<button className="concellbtn" style={{ color }}>
							取消
						</button>
					</Box>
					<Box>
						<HomeOutlined twoToneColor={color} />
						<SettingFilled twoToneColor={color} />
						<SmileOutlined twoToneColor={color} />
						<SyncOutlined spin twoToneColor={color} />
						<SmileOutlined twoToneColor={color} rotate={180} />
						<LoadingOutlined twoToneColor={color} />
					</Box>
					<Box>
						<div className="person_des" style={{ color: '#fff', background }}>
							I am alien <br />
							let us learn React!
						</div>
					</Box>
				</div>
			</div>
		);
	}
}

export default function ChangeTheme() {
	const [themeContextValue, setTheme] = useState(theme.light);
	return (
		<ThemeContext.Provider value={{ ...themeContextValue, setTheme }}>
			<App />
		</ThemeContext.Provider>
	);
}
