export class Stats {
  totalRevenue: string
  totalSpending: string
  budgetPercent: string
  balance: string

  constructor(totalRevenue: string, totalSpending: string, budgetPercent: string, balance: string) {
    this.totalRevenue = totalRevenue;
    this.totalSpending = totalSpending;
    this.budgetPercent = budgetPercent;
    this.balance = balance;
  }
}
