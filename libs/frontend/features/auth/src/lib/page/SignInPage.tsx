import { Card, CardContent } from '@mui/material';
import { FullBlockCenterLayout } from '@food-app/frontend/ui';
import { ReactNode } from 'react';

interface SignInPageProps {
  children: ReactNode;
}

export const SignInPage = (props: SignInPageProps): JSX.Element => {
  return (
    <FullBlockCenterLayout>
      <Card>
        <CardContent>{props.children}</CardContent>
      </Card>
    </FullBlockCenterLayout>
  );
};
