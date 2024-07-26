import { Box, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import CustomLoading from "../../layout/CustomLoading";
import moment from "moment";
import Util from "@/utils/utils";

interface Transaction {
  id_transaction: number;
  description: string;
  points: number;
  value: number;
  cpf: string;
  status: number;
  created_at: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
  loading: boolean;
  error: string;
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions, loading, error }) => {

  const returnStatus = (status: number) => {
    switch (status) {
      case 1:
        return "Em Avaliação";
      case 2:
        return "Reprovado";
      case 3:
        return "Aprovado";
      default:
        return "";
    }
  }

  return (
    <>
      <Box
        sx={{
          p: { xs: 2, sm: 4 },
          border: '1px solid #dedede',
          borderRadius: 4,
          mt: 2
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>Últimas Transações</Typography>
        <CustomLoading isLoading={loading}>
          <Typography>{error}</Typography>
          {transactions.length > 0 && (
            <TableContainer sx={{ overflowX: 'auto' }}>
              <Divider sx={{ m: 0 }} />
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Data</strong></TableCell>
                    <TableCell><strong>CPF</strong></TableCell>
                    <TableCell><strong>Descrição</strong></TableCell>
                    <TableCell><strong>Valor</strong></TableCell>
                    <TableCell><strong>Pontos</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.length ? transactions.map((item, index) => (
                    <>
                      <TableRow hover key={index}>
                        <TableCell>{moment(item.created_at).format("DD/MM/YYYY")}</TableCell>
                        <TableCell>{Util.formatCpf(item.cpf)}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>{Util.formatToCurrency(item.value)}</TableCell>
                        <TableCell>{item.points}</TableCell>
                        <TableCell>{returnStatus(item.status)}</TableCell>
                      </TableRow>
                    </>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={5} align="left">
                        Nenhum registro foi adicionado
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CustomLoading >
      </Box>
    </>
  )
}

export default TransactionTable;