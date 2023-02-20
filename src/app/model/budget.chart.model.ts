export class BudgetChart {
  spendingsMonth: number[];
  budgetsMonth: number[];
  months: string[];

  constructor(spendingsMonth: number[], budgetsMonth: number[], months: string[]) {
    this.spendingsMonth = spendingsMonth;
    this.budgetsMonth = budgetsMonth;
    this.months = months;
  }
}
