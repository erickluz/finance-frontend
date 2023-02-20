export class BudgetChart {
  spendingsMonth: number[];
  budgetsMonth: number[];

  constructor(spendingsMonth: number[], budgetsMonth: number[]) {
    this.spendingsMonth = spendingsMonth;
    this.budgetsMonth = budgetsMonth;
  }
}
