export class ItemCheckSpending {
  id : string
  name : string
  date : string
  card : string
  value : number
  isAssociable : boolean
  checked : boolean

  constructor(id: string, name: string, date: string, card: string, value: number, isAssociable: boolean, checked :boolean) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.card = card;
    this.value = value;
    this.isAssociable = isAssociable;
    this.checked = checked;
  }
}
