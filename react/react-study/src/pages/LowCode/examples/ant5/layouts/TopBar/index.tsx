import React, { CSSProperties, memo } from 'react';
import { Box } from '../../components/Box';
import styled from 'styled-components';

const StyledBox = styled(Box)`
	padding: 0 8px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 48px;
`;

export const TopBar = memo(
	(props: { className?: string; style?: CSSProperties; children?: React.ReactNode }) => {
    const { className, style, children, ...other } = props;

    return (
      <StyledBox></StyledBox>
    );
  }
);
