export class ItemCategory {
  check: boolean
  value: number
  name: string
  percent: string
  constructor(check:boolean, value: number, name: string, percent: string) {
    this.check = check
    this.value = value
    this.name = name
    this.percent = percent
  }
}
