export class SpendingCheckMonth {
  id : string
  nameMonth : string
  date: string
  isCheck : boolean

  constructor(id:string, nameMonth:string, date: string, isCheck:boolean) {
    this.id = id;
    this.nameMonth = nameMonth;
    this.date = date
    this.isCheck = isCheck;
  }
}
