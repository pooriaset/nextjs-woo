import { Grid } from '@mui/material';
import { Section } from './components/Section';

const page = () => {
  return (
    <Grid container height="60vh" spacing={2}>
      <Grid item md={6} xs={12}>
        <Section></Section>
      </Grid>
      <Grid container item md={6} xs={12} spacing={2}>
        <Grid item xs={12} md={6}>
          <Section></Section>
        </Grid>
        <Grid item xs={12} md={6}>
          <Section></Section>
        </Grid>
        <Grid item xs={12} md={6}>
          <Section></Section>
        </Grid>
        <Grid item xs={12} md={6}>
          <Section></Section>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default page;
