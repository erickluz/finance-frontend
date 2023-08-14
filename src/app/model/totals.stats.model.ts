export class TotalsStats {
  totalRevenue: string
  totalSpending: string
  totalGoalMoney: string
  totalBudgetBalance: string
  totalBalance: string
  totalDebt: string

  constructor(totalRevenue: string, totalSpending: string, totalGoalMoney: string, totalBudgetBalance: string, totalBalance: string, totalDebt: string) {
    this.totalRevenue = totalRevenue;
    this.totalSpending = totalSpending;
    this.totalGoalMoney = totalGoalMoney;
    this.totalBudgetBalance = totalBudgetBalance;
    this.totalBalance = totalBalance;
    this.totalDebt = totalDebt;
  }
}
