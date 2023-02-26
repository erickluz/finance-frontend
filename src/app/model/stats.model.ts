export class Stats {
  revenueMonth: string
  spendingMonth: string
  balanceMonth: string
  balanceGoalMonth: string
  budgetMoney: string
  goalMoney: string
  budgetPercentage: string
  totalBalance: string

  constructor(revenueMonth: string, spendingMonth: string, balanceMonth: string, balanceGoalMonth: string, budgetMoney: string, goalMoney: string, budgetPercentage: string, totalBalance: string) {
    this.revenueMonth = revenueMonth;
    this.spendingMonth = spendingMonth;
    this.balanceMonth = balanceMonth;
    this.balanceGoalMonth = balanceGoalMonth
    this.budgetMoney = budgetMoney;
    this.goalMoney = goalMoney;
    this.budgetPercentage = budgetPercentage;
    this.totalBalance = totalBalance;
  }
}
