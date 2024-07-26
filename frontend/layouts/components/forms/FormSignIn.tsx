'use client'
import { Box, Button, Grid, Link, Typography } from "@mui/material";
import CustomTextField from "../fields/CustomTextField";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";

type FormValues = {
  email: string
  password: string
}

let schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required()
});

export default function FormSignIn() {

  const router = useRouter();

  const [showError, setShowError] = useState<String>("");

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const result = await signIn('credentials', { ...data, redirect: false });

    if (result && result.error == 'CredentialsSignin') {
      setShowError('Usuário ou senha incorretos.');
      return;
    } else if (result && result.error) {
      setShowError(result.error);
      return;
    }

    router.replace('/home');
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowError("");
    handleSubmit(onSubmit)();
  };

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
      {showError && (
        <Typography sx={{ color: 'red', mt: 2, textAlign: 'center' }}>
          {showError}
        </Typography>
      )}
      <Box component="form" noValidate onSubmit={handleFormSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <CustomTextField
              name="email"
              required
              label="E-mail"
              control={control}
              error={errors}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <CustomTextField
              name="password"
              required
              label="Senha"
              control={control}
              error={errors}
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