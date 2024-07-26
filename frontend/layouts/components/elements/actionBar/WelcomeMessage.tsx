import { Grid, Typography } from "@mui/material";

interface WelcomeMessageProps {
  username: string | undefined;
}

export function WelcomeMessage({ username }: WelcomeMessageProps) {
  return (
    <Grid item sm={8} xs={12}>
      <Typography variant="h4">Bem-Vindo, {username}</Typography>
    </Grid>
  )
}