export class SpendingCheckMonth {
  id : string
  nameMonth : string
  checked : boolean

  constructor(id:string, nameMonth:string, checked:boolean) {
    this.id = id;
    this.nameMonth = nameMonth;
    this.checked = checked;
  }
}
