import { useContext } from 'react';

export const useDesignerEngine = () => {
	const designer = useContext();
	return designer;
};
