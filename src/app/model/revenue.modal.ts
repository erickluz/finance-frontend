export class Revenue {
  id: string
  type: string
  date: string
  idType: string
  value: string

  constructor(id: string, type: string, date: string, idType: string, value: string) {
    this.id = id
    this.type = type
    this.date = date
    this.idType = idType
    this.value = value
  }
}
