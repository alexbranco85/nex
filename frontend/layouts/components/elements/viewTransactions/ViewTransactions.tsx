'use client'
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import TransactionTable from "./TransactionTable";
import TransactionFilter from "./TransactionFilter";

interface Transaction {
  id_transaction: number;
  description: string;
  points: number;
  value: number;
  cpf: string;
  status: number;
  created_at: string;
}

export function ViewTransactions() {

  const { data: session, status } = useSession();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const getTransactions = async (filter: any) => {
    setLoading(true);
    setError('');
    if (!session?.user.cpf || !session?.user.token) {
      console.error("CPF or token not found in session");
      return;
    }

    const payload = {
      ...filter
    };

    if (!Boolean(session?.user.is_admin)) {
      payload.cpf = session.user.cpf;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/filtertransactions`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${session.user.token}`
        },
        body: JSON.stringify({
          filter: payload
        })
      });
      const responseJson = await response.json();
      setTransactions(responseJson.rows || []);

      if(responseJson.error) {
        setError(responseJson.error);
      }

    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  useEffect(() => {
    if (status === "authenticated" && !transactions.length) {
      getTransactions(null);
    }
  }, [status, session]);

  return (
    <>
      <TransactionFilter getTransactions={getTransactions} />
      <TransactionTable transactions={transactions} loading={loading} error={error} />
    </>
  );
}