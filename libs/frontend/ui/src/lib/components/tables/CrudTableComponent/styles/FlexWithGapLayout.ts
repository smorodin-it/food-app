import styled from '@emotion/styled/macro';
import { CSSProperties } from 'react';

interface RowWithGapLayoutProps {
  flexDirection?: CSSProperties['flexDirection'];
  justifyContent?: CSSProperties['justifyContent'];
}

const FlexWithGapLayout = styled.div<RowWithGapLayoutProps>`
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  ${(props) =>
    props.justifyContent ? `justify-content: ${props.justifyContent};` : ''};
  gap: 1.6rem;
`;

FlexWithGapLayout.defaultProps = {
  flexDirection: 'row',
};

export default FlexWithGapLayout;
