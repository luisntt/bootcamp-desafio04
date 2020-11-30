import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransationDTO {
  value: number;
  type: 'income' | 'outcome';
  title: string;
}
class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let income = 0;
    let outcome = 0;
    let total = 0;

    this.transactions.forEach(element => {
      if (element.type === 'income') {
        income += element.value;
      } else {
        outcome += element.value;
      }
    });
    total = income - outcome;
    const balance = { income, outcome, total };

    return balance;
  }

  public create({ title, value, type }: CreateTransationDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
