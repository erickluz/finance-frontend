export class Spending {
  id: string
  name: string
  idCategory: string
  date: string
  value: string
  parts: string

  constructor(id: string, name: string, idCategory: string, date: string, value: string, parts: string) {
    this.id = id;
    this.name = name;
    this.idCategory = idCategory;
    this.date = date;
    this.value = value;
    this.parts = parts;
  }
}
