'use client'
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function UploadFile() {

  const session = useSession();

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Selecione um arquivo.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploadfile`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.data?.user?.token}`
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error uploading file');
      }

      setFile(null);

      setTimeout(() => {
        setLoading(false);
        alert('Arquivo enviado com sucesso');
      }, 3000);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Erro ao enviar arquivo');
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        p: 4,
        border: '1px solid #dedede',
        borderRadius: 4,
        mt: 2
      }}
    >
      {loading && (
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <CircularProgress />
        </Grid>
      )}
      {!loading && (
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h5">Upload Planilha Excel</Typography>
          </Grid>
          <Grid item xs={12}>
            <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleUpload}>
              Upload
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  )
}