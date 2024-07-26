'use client'
import { Box, Button, Grid, Link, Typography } from "@mui/material";
import CustomTextField from "../fields/CustomTextField";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Util from "@/utils/utils";
import CustomLoading from "../layout/CustomLoading";

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
  email: yup.string().email().required(),
  cpf: yup.string().required(),
  password: yup.string().required()
});


export default function FormSignUp() {

  const router = useRouter();

  const [error, setError] = useState<String>("");
  const [success, setSuccess] = useState<String>("");
  const [loading, setLoading] = useState<Boolean>(false);

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

  const onSubmit: SubmitHandler<FormValues> = async (data) => {

    const checkCpf = Util.checkCpf(data.cpf);
    if (!checkCpf) {
      setError("CPF inválido");
      return;
    }

    data.cpf = data.cpf.replace(/\D/g, '');

    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          name: data.firstName + ' ' + data.lastName
        })
      });
      const responseJson = await response.json();

      if (responseJson.error) {
        setError(responseJson.error);
      } else {
        setError("");
      }

      if (responseJson.success) {
        setSuccess("Cadastro realizado com Sucesso! Você será redirecionado para a página de Login em instantes.")
        setTimeout(() => {
          router.push('/');
        }, 3000);
      }
      setTimeout(() => {
        setLoading(false);
      }, 2000);

    } catch (error) {
      console.error("Error fetching transactions:", error);
      setLoading(false);
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(onSubmit)();
  };

  return (
    <CustomLoading isLoading={Boolean(loading)}>
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
        {error && (
          <Typography sx={{ color: 'red', mt: 2, textAlign: 'center' }}>
            {error}
          </Typography>
        )}
        {success && (
          <Typography sx={{ color: 'green', mt: 2, textAlign: 'center' }}>
            {success}
          </Typography>
        )}
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
                type={"email"}
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
              <Link href="/" variant="body2">
                Já tem uma conta? Clique aqui para Entrar
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </CustomLoading>
  )
}