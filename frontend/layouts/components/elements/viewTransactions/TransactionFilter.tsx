'use client'
import { Box, Button, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { CustomSelectField } from "../../fields/CustomSelectField";
import { useForm } from "react-hook-form";
import CustomTextField from "../../fields/CustomTextField";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

interface FormValues {
  status?: number;
  startValueRange?: number;
  endValueRange?: number;
  startPointsRange?: number;
  endPointsRange?: number;
  cpf?: string;
}

type GetTransactionsFunction = (param1: object) => Promise<void>;

interface TransactionFilterProps {
  getTransactions: GetTransactionsFunction;
}

const TransactionFilter: React.FC<TransactionFilterProps> = ({ getTransactions }) => {

  const session = useSession();

  const {
    getValues,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      status: undefined,
      startValueRange: undefined,
      endValueRange: undefined,
      startPointsRange: undefined,
      endPointsRange: undefined,
      cpf: ""
    }
  })

  const handleClearFilters = () => {
    reset();
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = getValues();

    if (payload.cpf === "") {
      delete payload.cpf;
    } else {
      payload.cpf = payload.cpf?.replace(/\D/g, '');
    }
    getTransactions(payload);
  }

  const statusOptions = [
    { value: 1, content: 'Em Avaliação' },
    { value: 2, content: 'Reprovado' },
    { value: 3, content: 'Aprovado' }
  ]

  const valueOptions = [
    { value: 100, content: 'R$ 100,00' },
    { value: 500, content: 'R$ 500,00' },
    { value: 1000, content: 'R$ 1.000,00' },
    { value: 2000, content: 'R$ 2.000,00' },
    { value: 3000, content: 'R$ 3.000,00' },
    { value: 4000, content: 'R$ 4.000,00' },
    { value: 5000, content: 'R$ 5.000,00' },
    { value: 10000, content: 'R$ 10.000,00' },
    { value: 15000, content: 'R$ 15.000,00' }
  ];

  const pointsOptions = [
    { value: 100, content: '100' },
    { value: 500, content: '500' },
    { value: 1000, content: '1.000' },
    { value: 2000, content: '2.000' },
    { value: 3000, content: '3.000' },
    { value: 4000, content: '4.000' },
    { value: 5000, content: '5.000' },
    { value: 10000, content: '10.000' },
  ]

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 4 },
        border: '1px solid #dedede',
        borderRadius: 4,
        mt: 2
      }}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>Filtrar Transações</Typography>
      <Box component="form" noValidate onSubmit={handleFormSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>

          {Boolean(session.data?.user?.is_admin) && (
            <>
              <Grid item sm={6} xs={12}>
                <CustomSelectField
                  control={control}
                  itemcontent="content"
                  itemvalue="value"
                  name="startPointsRange"
                  error={errors}
                  label="Mínimo Pontos"
                  options={pointsOptions}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <CustomSelectField
                  control={control}
                  itemcontent="content"
                  itemvalue="value"
                  name="endPointsRange"
                  error={errors}
                  label="Máximo Pontos"
                  options={pointsOptions}
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <CustomTextField
                  name="cpf"
                  required
                  label="CPF"
                  control={control}
                />
              </Grid>
            </>
          )}

          <Grid item sm={6} xs={12}>
            <CustomSelectField
              control={control}
              itemcontent="content"
              itemvalue="value"
              name="startValueRange"
              error={errors}
              label="Valor Mínimo"
              options={valueOptions}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <CustomSelectField
              control={control}
              itemcontent="content"
              itemvalue="value"
              name="endValueRange"
              error={errors}
              label="Valor Máximo"
              options={valueOptions}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <CustomSelectField
              control={control}
              itemcontent="content"
              itemvalue="value"
              name="status"
              error={errors}
              label="Status"
              options={statusOptions}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <Button onClick={handleClearFilters} fullWidth>Limpar Filtros</Button>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Button type="submit" fullWidth>Filtrar</Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default TransactionFilter;