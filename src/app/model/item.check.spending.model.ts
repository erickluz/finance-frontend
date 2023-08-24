export class ItemCheckSpending {
  id : string
  name : string
  date : string
  card : string
  value : number
  isAssociable : boolean
  checked : boolean
  isJustified : boolean

  constructor(id: string, name: string, date: string, card: string, value: number, isAssociable: boolean, checked :boolean, isJustified : boolean) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.card = card;
    this.value = value;
    this.isAssociable = isAssociable;
    this.checked = checked;
    this.isJustified = isJustified;
  }
}
