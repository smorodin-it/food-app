import styled from '@emotion/styled';
import { theme } from '../../theme/theme';

export const AppLayout = styled.div`
  height: 100vh;

  display: grid;
  gap: 0.8rem 0.8rem;
  grid-template-columns: 1fr;
  grid-template-rows: max-content 1fr;
  grid-template-areas:
    'TopArea'
    'AppArea';

  ${theme.breakpoints.up('laptop')} {
    grid-template-columns: 20rem 1fr;
    grid-template-rows: 6.4rem 1fr;
    gap: 1.6rem 1.6rem;
    grid-template-areas:
      'SideBarArea AppArea'
      'SideBarArea AppArea';
  }
`;
