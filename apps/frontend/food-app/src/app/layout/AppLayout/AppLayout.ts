import styled from '@emotion/styled';

const AppLayout = styled.div`
  width: 100vw;
  height: 100vh;

  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 100px 1fr;
  gap: 1.6rem 1.6rem;
  grid-template-areas:
    'SideBarArea TopArea'
    'SideBarArea AppArea';
`;

export default AppLayout;
