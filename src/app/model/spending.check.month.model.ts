export class SpendingCheckMonth {
  id : string
  nameMonth : string
  date: string
  checked : boolean

  constructor(id:string, nameMonth:string, date: string,checked:boolean) {
    this.id = id;
    this.nameMonth = nameMonth;
    this.date = date
    this.checked = checked;
  }
}
