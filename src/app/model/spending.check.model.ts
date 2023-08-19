export class SpendingCheck {
  id : string
  idSpending : string
  idSpendingCheckMonth : string
  note : string

  constructor(id: string, idSpending: string, idSpendingCheckMonth: string, note: string) {
    this.id = id;
    this.idSpending = idSpending;
    this.idSpendingCheckMonth = idSpendingCheckMonth;
    this.note = note;
  }
}
