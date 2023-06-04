import { Card, CardContent } from '@mui/material';
import { FullBlockCenterLayout } from '@food-app/frontend/ui';
import { FC, ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import { AuthStore } from '@food-app/frontend/data-access/auth';
import { Navigate } from 'react-router-dom';
import { routes } from '@food-app/frontend/utils';

interface SignInPageProps {
  children: ReactNode;
}

export const SignInPage: FC<SignInPageProps> = observer((props) => {
  return AuthStore.isAuth ? (
    <Navigate to={routes.index()} replace />
  ) : (
    <FullBlockCenterLayout>
      <Card>
        <CardContent>{props.children}</CardContent>
      </Card>
    </FullBlockCenterLayout>
  );
});
