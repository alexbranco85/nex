'use client'
import { signOut, useSession } from "next-auth/react";
import { WelcomeMessage } from "./WelcomeMessage";
import { Button, Grid } from "@mui/material";
import { TotalPoints } from "./TotalPoints";
import { Suspense, useState } from "react";
import UploadFile from "./UploadFile";

export default function ActionBar() {

  const session = useSession();

  const [showBoxFile, setShowBoxFile] = useState(false);

  const logout = async () => {
    await signOut({
      redirect: true
    })
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {session.data && (
            <WelcomeMessage username={session?.data?.user?.name} />
          )}
        </Grid>
        <Grid item sm={4} xs={12} sx={{ display: 'flex', justifyContent: 'right', gap: 2 }}>
          {session.data && !Boolean(session.data?.user?.is_admin) ? (
            <Suspense fallback={<div>loading...</div>}>
              <TotalPoints userCpf={session.data?.user?.cpf} />
            </Suspense>
          ) : (
            <Button onClick={() => setShowBoxFile(state => !state)}>Upload Planilha de Transações</Button>
          )}
          <Button onClick={logout}>Sair</Button>
        </Grid>
        {showBoxFile && (
          <Grid item xs={12}>
            <UploadFile />
          </Grid>
        )}
      </Grid>
    </>
  )
}