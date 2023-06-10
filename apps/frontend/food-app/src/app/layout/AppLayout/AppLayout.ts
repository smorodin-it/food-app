import styled from '@emotion/styled';
import { MediaMinWidthConstants } from '@food-app/frontend/ui';

export const AppLayout = styled.div`
  width: 100vw;
  height: 100vh;

  display: grid;
  gap: 1.6rem 1.6rem;
  grid-template-columns:  1fr;
  grid-template-rows: 6.4rem 1fr;
  grid-template-areas:
    'TopArea'
    'AppArea';

  @media (min-width: ${MediaMinWidthConstants.laptop}px) {
    grid-template-columns: 20rem 1fr;
    grid-template-rows: 6.4rem 1fr;
    grid-template-areas:
    'SideBarArea AppArea'
    'SideBarArea AppArea';
  \`;
  }
`;
