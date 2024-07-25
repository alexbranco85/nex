'use client'
import { Box, Button, Grid, Link, Typography } from "@mui/material";
import CustomTextField from "../fields/CustomTextField";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";

type FormValues = {
  firstName: string
  lastName: string
  email: string
  cpf: string
  password: string
}

let schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required(),
  cpf: yup.string().required(),
  password: yup.string().required()
});


export default function FormSignUp() {

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      cpf: "",
      password: ""
    }
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = getValues();
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
        Cadastre-se
      </Typography>
      <Box component="form" noValidate onSubmit={handleFormSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              name="firstName"
              label="Nome"
              control={control}
              error={errors}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              label="Sobrenome"
              name="lastName"
              control={control}
              error={errors}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              label="Email"
              name="email"
              control={control}
              error={errors}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              name="cpf"
              label="CPF"
              type="cpf"
              control={control}
              error={errors}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              name="password"
              label="Senha"
              type="password"
              control={control}
              error={errors}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Cadastrar
        </Button>
        <Grid container justifyContent="flex-start">
          <Grid item>
            <Link href="#" variant="body2">
              Já tem uma conta? Clique aqui para Entrar
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}