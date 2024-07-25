import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import FormSignUp from '@/layouts/components/forms/FormSignUp';

export default function SignUp() {

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
      <FormSignUp />
      
    </Container>
  );
}