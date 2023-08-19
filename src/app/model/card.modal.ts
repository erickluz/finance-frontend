export class Card {
  id : string
  finalNumber : string
  issuer : string
  brand : string
  color : string
  type : string
  isChkByFile: boolean
  isBudget : boolean

    constructor(id: string, finalNumber : string, issuer : string, brand : string, color : string, type: string, isChkByFile: boolean, isBudget : boolean) {
      this.id = id;
      this.finalNumber = finalNumber;
      this.issuer = issuer;
      this.brand = brand;
      this.color = color;
      this.type = type;
      this.isChkByFile = isChkByFile;
      this.isBudget = isBudget;
    }

}
