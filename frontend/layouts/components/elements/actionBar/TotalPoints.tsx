'use client'

import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface TotalPointsProps {
  userCpf: string | undefined;
}

export function TotalPoints({ userCpf }: TotalPointsProps) {

  const [points, setPoints] = useState(null);

  const getTotalPoints = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/totalpoints`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          cpf: userCpf
        })
      });
      const responseJson = await response.json();

      if (responseJson.totalPoints) {
        setTimeout(() => {
          setPoints(responseJson.totalPoints);
        }, 1000);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }

  useEffect(() => {
    getTotalPoints()
  }, [])


  return (
    <Box
      sx={{
        p: 2,
        border: '1px solid #dedede',
        borderRadius: 2,
      }}
    >
      {points ? (
        <Typography>Sua Carteira: {points} pontos</Typography>
      ) : (
        <Typography>Carregando...</Typography>
      )}
    </Box>
  )
}