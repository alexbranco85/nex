import * as React from 'react';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import { ViewTransactions } from '@/layouts/components/elements/viewTransactions/ViewTransactions';
import ActionBar from '@/layouts/components/elements/actionBar/ActionBar';

export default function SignIn() {
  return (
    <Container
      component="main"
    >
      <Grid container spacing={4} sx={{ p: 4 }}>
        <Grid item xs={12}>
          <ActionBar />
          <ViewTransactions />
        </Grid>
      </Grid>
      
    </Container>
  );
}