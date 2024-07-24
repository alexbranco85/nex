const jwt = require('jsonwebtoken');
const TransactionModel = require('../models/TransactionModel')

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
        res.status(201).json(transactions);
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
        res.status(201).json(transactions);
      } else {
        res.status(400).json({ error: 'Não foram encontradas transações com os parâmetros solicitados.' });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}

module.exports = TransactionController;