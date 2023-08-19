import { ItemCheckSpending } from './item.check.spending.model'

export class SpendingCheckAssociation {
  spending: ItemCheckSpending
  creditCardSpending: ItemCheckSpending

  constructor(spending: ItemCheckSpending, creditCardSpending: ItemCheckSpending) {
    this.spending = spending
    this.creditCardSpending = creditCardSpending
  }

}
