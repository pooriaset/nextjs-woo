import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

const Page = () => {
  return (
    <Card variant="outlined">
      <CardContent>Login</CardContent>
      <CardActions>
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          size="large"
        >
          Login
        </Button>
      </CardActions>
    </Card>
  );
};

export default Page;
