export class AssociationsIDSDTO {
  idSpendingCheckMonth: number
  spendingsIds : number[]
  creditCardIds : number[]

  constructor(idSpendingCheckMonth: number, spendingsIds : number[], creditCardIds : number[]) {
    this.idSpendingCheckMonth = idSpendingCheckMonth
    this.spendingsIds = spendingsIds
    this.creditCardIds = creditCardIds
  }
}
