import { Card, CardContent, Container } from '@mui/material';
import { FC, ReactNode } from 'react';
import Header from './components/Header';
import MobileHeader from '@/components/MobileHeader/MobileHeader';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = async ({ children }) => {
  return (
    <>
      <MobileHeader />
      <Header />
      <Container
        maxWidth="xl"
        sx={{
          mt: -4,
        }}
      >
        <Card variant="outlined">
          <CardContent>{children}</CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Layout;
