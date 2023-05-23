export class Budget {
  id: number
  date: string
  formattedDate: string
  value: number
  constructor(id:number, date:string, formattedDate: string, value: number) {
    this.id = id
    this.date = date
    this.formattedDate = formattedDate
    this.value = value
  }
}
