export class Stats {
  monthRevenue: string
  monthSpending: string
  monthBalance: string
  monthBalanceGoal: string
  monthBudgetMoney: string
  monthGoalMoney: string
  monthBudgetPercentage: string
  totalRevenue: string
  totalSpending: string
  totalGoalMoney: string
  totalBudgetBalance: string
  totalBalance: string

  constructor(revenueMonth: string, spendingMonth: string, balanceMonth: string, balanceGoalMonth: string,
    budgetMoney: string, goalMoney: string, budgetPercentage: string, totalRevenue: string, totalSpending: string,
    totalGoalMoney: string, totalBudgetBalance: string, totalBalance: string) {
    this.monthRevenue = revenueMonth;
    this.monthSpending = spendingMonth;
    this.monthBalance = balanceMonth;
    this.monthBalanceGoal = balanceGoalMonth
    this.monthBudgetMoney = budgetMoney;
    this.monthGoalMoney = goalMoney;
    this.monthBudgetPercentage = budgetPercentage;
    this.totalRevenue = totalRevenue;
    this.totalSpending = totalSpending;
    this.totalGoalMoney = totalGoalMoney;
    this.totalBudgetBalance = totalBudgetBalance;
    this.totalBalance = totalBalance;
  }
}
