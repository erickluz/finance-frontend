export class BudgetChart {
  spendingsMonth: number[];
  budgetsMonth: number[];
  percentBudget: number[];
  months: string[];

  constructor(spendingsMonth: number[], budgetsMonth: number[], percentBudget: number[], months: string[]) {
    this.spendingsMonth = spendingsMonth;
    this.budgetsMonth = budgetsMonth;
    this.percentBudget = percentBudget;
    this.months = months;
  }
}
