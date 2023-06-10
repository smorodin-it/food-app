import styled from '@emotion/styled';
import { DeviceNames, MediaMinWidthSizes } from '@food-app/frontend/ui';

export const AppLayout = styled.div`
  width: 100vw;
  height: 100vh;

  display: grid;
  gap: 0.8rem 0.8rem;
  grid-template-columns: 1fr;
  grid-template-rows: max-content 1fr;
  grid-template-areas:
    'TopArea'
    'AppArea';

  @media (min-width: ${MediaMinWidthSizes[DeviceNames.LAPTOP]}) {
    grid-template-columns: 20rem 1fr;
    grid-template-rows: 6.4rem 1fr;
    gap: 1.6rem 1.6rem;
    grid-template-areas:
      'SideBarArea AppArea'
      'SideBarArea AppArea';
  }
`;
