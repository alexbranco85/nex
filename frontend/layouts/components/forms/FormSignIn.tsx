'use client'
import { Box, Button, Grid, Link, Typography } from "@mui/material";
import CustomTextField from "../fields/CustomTextField";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type FormValues = {
  email: string
  password: string
}

export default function FormSignIn() {

  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const result = await signIn('credentials', { ...data, redirect: false });

    if (result && result.error == 'CredentialsSignin') {
      console.log('Usuário ou senha incorretos.');
      return;
    } else if (result && result.error) {
      console.log(result.error);
      return;
    }

    router.replace('/home');
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(onSubmit)();
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: ""
    }
  })

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 4,
        border: '1px solid #dedede',
        borderRadius: 3
      }}
    >
      <Typography component="h1" variant="h4">
        Faça seu Login
      </Typography>
      <Box component="form" noValidate onSubmit={handleFormSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <CustomTextField
              name="email"
              required
              label="E-mail"
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <CustomTextField
              name="password"
              required
              label="Senha"
              control={control}
              type="password"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Entrar
        </Button>
        <Grid container>
          <Grid item>
            <Link href="/sign-up" variant="body2">
              {"Ainda não tem uma conta? Cadastre-se"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}