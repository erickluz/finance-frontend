export class MonthStats {
  monthRevenue: string
  monthSpending: string
  monthBalance: string
  monthBalanceGoal: string
  monthBudgetMoney: string
  monthGoalMoney: string
  monthBudgetPercentage: string

  constructor(revenueMonth: string, spendingMonth: string, balanceMonth: string, balanceGoalMonth: string,
    budgetMoney: string, goalMoney: string, budgetPercentage: string) {
    this.monthRevenue = revenueMonth;
    this.monthSpending = spendingMonth;
    this.monthBalance = balanceMonth;
    this.monthBalanceGoal = balanceGoalMonth
    this.monthBudgetMoney = budgetMoney;
    this.monthGoalMoney = goalMoney;
    this.monthBudgetPercentage = budgetPercentage;
  }
}
