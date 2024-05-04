import { Card, CardContent, Container } from '@mui/material';
import Header from './components/Header';

const page = () => {
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
