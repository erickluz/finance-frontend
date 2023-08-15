export class SpendingCheck {
  id : string
  name : string
  date : string
  card : string
  value : number
  checked : boolean

  constructor(id: string, name: string, date: string, card: string, value: number, checked :boolean) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.card = card;
    this.value = value;
    this.checked = checked;
  }
}
