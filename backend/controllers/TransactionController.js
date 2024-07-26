const jwt = require('jsonwebtoken');
const TransactionModel = require('../models/TransactionModel');
const xlsx = require('xlsx');

class TransactionController {
  static async transactionsAllUsers(req, res) {
    try {
      const transactions = await TransactionModel.getAllTransactions();
      if (transactions) {
        res.status(201).json(transactions);
      } else {
        res.status(400).json({ error: 'Não foram encontradas transações.' });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async transactionsByCpf(req, res) {
    const { cpf } = req.body;
    try {
      const transactions = await TransactionModel.getTransactionsByCpf(cpf);
      if (transactions) {
        res.status(201).json({ rows: transactions });
      } else {
        res.status(400).json({ error: 'Não foram encontradas transações para este CPF.' });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async transactionsByFilter(req, res) {
    const { filter } = req.body;
    try {
      const transactions = await TransactionModel.getTransactionsByFilter(filter);
      if (transactions.length) {
        res.status(201).json({ rows: transactions });
      } else {
        res.status(200).json({ error: 'Não foram encontradas transações com os parâmetros solicitados.' });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async transactionsTotalPoints(req, res) {
    const { cpf } = req.body;
    try {
      const totalPoints = await TransactionModel.getTotalPoints(cpf);
      if (totalPoints) {
        res.status(201).json({ ...totalPoints });
      } else {
        res.status(400).json({ error: 'Não foram encontradas transações para este CPF.' });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async transactionsFileSave(req, res) {
    try {

      if (!req.file) {
        return res.status(400).send('No file was uploaded.');
      }

      // console.log('File received:', req.file);

      const file = req.file;

      const workbook = xlsx.read(file.buffer, { type: 'buffer' });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const rows = xlsx.utils.sheet_to_json(sheet);

      const excelDateToJSDate = (excelDate) => {
        const excelBaseDate = new Date(1899, 11, 30);
        const millisecondsPerDay = 86400000;
        return new Date(excelBaseDate.getTime() + excelDate * millisecondsPerDay);
      }

      const transactions = rows.map((row) => ({
        cpf: typeof row['CPF'] === 'string' ? row['CPF'].replace(/\D/g, '') : '',
        description: row['Descrição da transação'] || '',
        created_at: typeof row['Data da transação'] === 'number' ? excelDateToJSDate(row['Data da transação']) : new Date(row['Data da transação']),
        points: typeof row['Valor em pontos'] == 'string' ? Number(row['Valor em pontos'].replace(/[^\d]/g, '')) : row['Valor em pontos'],
        value: typeof row['Valor'] == 'string' ? Number(row['Valor'].replace(/[^\d]/g, '')) : row['Valor'],
        status: TransactionModel.parseStatus(row['Status']),
      }));

      console.log('transactions', transactions);

      await TransactionModel.saveTransactionsFile(transactions);

      res.status(200).json({ message: 'Data imported successfully' });

    } catch (error) {
      console.error('Error importing data:', error);
      res.status(500).json({ message: 'Error importing data', error: error.message });
    }
  }
}

module.exports = TransactionController;