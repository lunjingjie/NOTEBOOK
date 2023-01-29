// 逐层传递Provider
import React, { useContext, useState } from 'react';

const ThemeContext = React.createContext(null);
function Son2() {
	return (
		<ThemeContext.Consumer>
			{(themeContextValue) => {
				const { color, background } = themeContextValue;
				return <div style={{ color, background, margin: 10 }}>第二层Provder</div>;
			}}
		</ThemeContext.Consumer>
	);
}

function Son() {
	const { color, background } = useContext(ThemeContext);
	const [themeContextValue2] = useState({ color: '#fff', background: 'blue' });

	return (
		<div style={{ color, background, padding: 10 }}>
			第一层provider
			<ThemeContext.Provider value={themeContextValue2}>
				<Son2 />
			</ThemeContext.Provider>
		</div>
	);
}

export default function Provider1Demo() {
	const [themeContextValue] = useState({ color: 'orange', background: 'pink' });
	return (
		<ThemeContext.Provider value={themeContextValue}>
			<Son />
		</ThemeContext.Provider>
	);
}
