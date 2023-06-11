export class Spending {
  id: string
  name: string
  namePart: string
  type: number
  idCategory: string
  date: string
  value: string
  parts: string
  idCard: string
  card: string
  isFirstPart : boolean

  constructor(id: string, name: string, namePart: string, type: number, idCategory: string, date: string, value: string, parts: string, idCard : string, card: string, isFirstPart : boolean) {
    this.id = id;
    this.name = name;
    this.namePart = namePart;
    this.type = type;
    this.idCategory = idCategory;
    this.date = date;
    this.value = value;
    this.parts = parts;
    this.idCard = idCard;
    this.card = card;
    this.isFirstPart = isFirstPart;
  }
}
