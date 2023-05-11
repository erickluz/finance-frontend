export class Card {
  id : string
  finalNumber : string
  issuer : string
  brand : string
  color : string
  type : string
  isBudget : boolean

    constructor(id: string, finalNumber : string, issuer : string, brand : string, color : string, type: string, isBudget : boolean) {
      this.id = id;
      this.finalNumber = finalNumber;
      this.issuer = issuer;
      this.brand = brand;
      this.color = color;
      this.type = type;
      this.isBudget = isBudget;
    }

}
