import { Card, CardContent, Container } from '@mui/material';
import Header from './components/Header';
import { Sleep } from '@/services/common';

const page = async () => {
  await Sleep(200);
  return (
    <>
      <Header />
      <Container
        maxWidth="xl"
        sx={{
          mt: -4,
        }}
      >
        <Card variant="outlined">
          <CardContent></CardContent>
        </Card>
      </Container>
    </>
  );
};

export default page;
