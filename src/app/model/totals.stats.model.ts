export class TotalsStats {
  totalRevenue: string
  totalSpending: string
  totalGoalMoney: string
  totalBudgetBalance: string
  totalBalance: string

  constructor(totalRevenue: string, totalSpending: string, totalGoalMoney: string, totalBudgetBalance: string, totalBalance: string) {
    this.totalRevenue = totalRevenue;
    this.totalSpending = totalSpending;
    this.totalGoalMoney = totalGoalMoney;
    this.totalBudgetBalance = totalBudgetBalance;
    this.totalBalance = totalBalance;
  }
}
