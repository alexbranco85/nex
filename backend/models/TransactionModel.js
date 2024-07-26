const db = require('../db');

class TransactionModel {
  static async getAllTransactions() {
    return await db('transaction');
  }

  static async getTransactionsByCpf(cpf) {
    return await db('transaction').where({ cpf });
  }

  static async getTransactionsByFilter(filter) {
    const { startDate, endDate, description, cpf, status, startValueRange, endValueRange, startPointsRange, endPointsRange } = filter;
    let query = db('transaction').select('*');
    if (startDate && endDate) {
      query.whereBetween('created_at', [startDate, endDate]);
    }
    if (description) {
      query.andWhere('description', 'like', `%${description}%`);
    }
    if (cpf) {
      query.andWhere('cpf', cpf);
    }
    if (status) {
      query.andWhere('status', status);
    }
    if (startValueRange && endValueRange) {
      query.whereBetween('value', [startValueRange, endValueRange]);
    }
    if (startPointsRange && endPointsRange) {
      query.whereBetween('points', [startPointsRange, endPointsRange]);
    }
    return await query;
  }

  static async getTotalPoints(cpf) {
    return await db('transaction')
      .where({ cpf, status: 3 })
      .sum('points as totalPoints')
      .first();
  }

  static async saveTransactionsFile(transactions) {
    await db('transaction').insert(transactions);
  }

  static parseStatus(status) {
    switch (status.toLowerCase()) {
      case 'em avaliação':
        return 1;
      case 'reprovado':
        return 2;
      case 'aprovado':
        return 3;
      default:
        throw new Error('Invalid status value');
    }
  };
}

module.exports = TransactionModel;