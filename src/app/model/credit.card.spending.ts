export class CreditCardSpending {
  id : string
  description : string
  date: string
  value : number
  part : string

  constructor(id:string, description:string, date:string, value:number, part:string) {
    this.id = id;
    this.description = description
    this.date = date;
    this.value = value
    this.part = part
  }
}
