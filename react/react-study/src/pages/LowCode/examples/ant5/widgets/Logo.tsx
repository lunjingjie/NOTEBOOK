import { memo } from 'react';

export const Logo: React.FC = memo(() => {
	return (
		<div style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
			<img alt="no item" height={32} width={32} src="logo.png" />
		</div>
	);
});
