export class Spending {
  id: string
  name: string
  idCategory: string
  date: string
  value: string
  parts: string
  idCard: string
  card: string

  constructor(id: string, name: string, idCategory: string, date: string, value: string, parts: string, idCard : string, card: string) {
    this.id = id;
    this.name = name;
    this.idCategory = idCategory;
    this.date = date;
    this.value = value;
    this.parts = parts;
    this.idCard = idCard;
    this.card = card;
  }
}
