import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import FormSignIn from '@/layouts/components/forms/FormSignIn';

export default function SignIn() {

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        height: '100dvh',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <CssBaseline />
      <FormSignIn />
      
    </Container>
  );
}