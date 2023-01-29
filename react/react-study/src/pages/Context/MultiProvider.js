/**
 * 嵌套Provider
 */
import React from 'react';

const ThemeContext = React.createContext(null); // 主题颜色context
const LanContext = React.createContext(null); // 主题语言context

function ConsumerDemo() {
	return (
		<ThemeContext.Consumer>
			{(themeContextValue) => (
				<LanContext.Consumer>
					{(lanContextValue) => {
						const { color, background } = themeContextValue;
						return (
							<div style={{ color, background }}>
								{lanContextValue === 'CH' ? '大家好' : 'hello,everyone'}
							</div>
						);
					}}
				</LanContext.Consumer>
			)}
		</ThemeContext.Consumer>
	);
}

const Son = React.memo(() => <ConsumerDemo />);

export default function ProviderDemo() {
	const [themeContextValue] = React.useState({
		color: '#FFF',
		background: 'blue'
	});
	const [lanContextValue] = React.useState('CH');
	return (
		<ThemeContext.Provider value={themeContextValue}>
			<LanContext.Provider value={lanContextValue}>
				<Son />
			</LanContext.Provider>
		</ThemeContext.Provider>
	);
}
